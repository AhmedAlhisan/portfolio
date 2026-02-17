import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0), // Should be empty - bot trap
})

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 3, // Maximum 3 submissions
  windowMs: 60 * 60 * 1000, // Per 1 hour
}

function getClientIdentifier(request: NextRequest): string {
  // Use multiple identifiers for better accuracy
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() :
             request.headers.get('x-real-ip') ||
             'unknown'
  return ip
}

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // Clean up old records
  if (record && now > record.resetTime) {
    rateLimitStore.delete(identifier)
  }

  const currentRecord = rateLimitStore.get(identifier)

  if (!currentRecord) {
    // First request from this identifier
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return { allowed: true }
  }

  if (currentRecord.count >= RATE_LIMIT.maxRequests) {
    const retryAfter = Math.ceil((currentRecord.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  // Increment count
  currentRecord.count++
  return { allowed: true }
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const identifier = getClientIdentifier(request)
    const rateLimitCheck = checkRateLimit(identifier)

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitCheck.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitCheck.retryAfter),
          }
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { name, email, message, honeypot } = validationResult.data

    // Check honeypot field (should be empty)
    if (honeypot !== '') {
      // Bot detected - silently reject
      console.log('Bot detected via honeypot field')
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    }

    // Send email using your preferred service
    // Option 1: Using Resend (recommended)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_TO || 'alhisan.swe@gmail.com',
        replyTo: sanitizedData.email,
        subject: `Portfolio Contact: ${sanitizedData.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0891b2;">New Contact Form Submission</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      })
    }
    // Option 2: Using Nodemailer (alternative)
    else if (process.env.SMTP_HOST) {
      const nodemailer = await import('nodemailer')

      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO || 'alhisan.swe@gmail.com',
        replyTo: sanitizedData.email,
        subject: `Portfolio Contact: ${sanitizedData.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0891b2;">New Contact Form Submission</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${sanitizedData.name}</p>
              <p><strong>Email:</strong> ${sanitizedData.email}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      })
    }
    // Option 3: Fallback - just log (for development)
    else {
      console.log('📧 Contact Form Submission:', sanitizedData)
      console.warn('⚠️  No email service configured. Set RESEND_API_KEY or SMTP credentials.')
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

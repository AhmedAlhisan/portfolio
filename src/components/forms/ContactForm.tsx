'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  honeypot: z.string().max(0), // Anti-bot field (should remain empty)
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error(result.error || 'Too many requests. Please try again later.')
        }
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-theme opacity-80">
          Name
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Your name"
          className="bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 text-theme placeholder:text-theme placeholder:opacity-40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-theme opacity-80">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your.email@example.com"
          className="bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 text-theme placeholder:text-theme placeholder:opacity-40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-theme opacity-80">
          Message
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell me about your project or idea..."
          rows={5}
          className="bg-white/5 dark:bg-white/5 border-white/10 dark:border-white/10 text-theme placeholder:text-theme placeholder:opacity-40 focus:border-cyan-400/50 focus:ring-cyan-400/20 resize-none"
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/30 text-green-400 text-sm">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-400/30 text-red-400 text-sm">
          ✗ Failed to send message. Please try again or email me directly.
        </div>
      )}
    </form>
  )
}

# Contact Form Setup Guide

Your contact form is now fully functional with enterprise-grade security features. This guide will help you configure it for production.

## 🔒 Security Features Implemented

### 1. **Rate Limiting**
- Limits each IP to **3 submissions per hour**
- Prevents spam and DDoS attacks
- Returns HTTP 429 with `Retry-After` header when exceeded

### 2. **Honeypot Field**
- Hidden field that only bots will fill out
- Silently rejects bot submissions
- No user impact

### 3. **Input Validation & Sanitization**
- Zod schema validation on both client and server
- Removes HTML tags to prevent XSS attacks
- Character limits on all fields
- Email format validation

### 4. **Request Security**
- CORS headers configured
- Content-Type validation
- IP-based identification
- Error handling without exposing internals

## 📧 Email Service Configuration

You have **two options** for sending emails. Choose one:

### Option 1: Resend (Recommended) ⭐

**Why Resend?**
- Modern, developer-friendly API
- 100 emails/day on free tier
- Easy setup, no SMTP configuration
- Built for Next.js

**Setup Steps:**

1. **Create Resend Account**
   - Visit [resend.com](https://resend.com)
   - Sign up with your email
   - Verify your email address

2. **Get API Key**
   - Go to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Copy the key (starts with `re_...`)

3. **Configure Domain (Optional but Recommended)**
   - Go to [Domains](https://resend.com/domains)
   - Add your domain
   - Add the DNS records provided
   - This allows you to send from `noreply@yourdomain.com`

4. **Update Environment Variables**
   ```bash
   RESEND_API_KEY="re_your_api_key_here"
   EMAIL_FROM="Portfolio Contact <noreply@yourdomain.com>"
   EMAIL_TO="alhisan.swe@gmail.com"
   ```

5. **Test It**
   - Submit a test message on your contact form
   - Check your email inbox

### Option 2: SMTP (Alternative)

**Use if you already have:**
- Gmail account with App Password
- Custom email server
- Business email with SMTP access

**Setup Steps for Gmail:**

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Create App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update Environment Variables**
   ```bash
   # Comment out Resend variables
   # RESEND_API_KEY=""

   # Add SMTP variables
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password-here"
   EMAIL_FROM="Portfolio Contact <your-email@gmail.com>"
   EMAIL_TO="alhisan.swe@gmail.com"
   ```

## 🚀 Deployment Checklist

### Before Deploying:

- [ ] **Environment Variables Set**
  - Add all required variables to your hosting platform
  - Never commit `.env` to version control
  - Ensure `.env` is in `.gitignore`

- [ ] **Email Service Configured**
  - Test email sending in development
  - Verify you receive test emails
  - Check spam folder

- [ ] **Rate Limiting Tested**
  - Submit form 4 times quickly
  - Verify 4th attempt is blocked
  - Confirm error message displays

- [ ] **Security Headers**
  - Add to `next.config.js`:
    ```js
    async headers() {
      return [
        {
          source: '/api/contact',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
          ],
        },
      ]
    }
    ```

### Platform-Specific Setup:

#### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Add environment variables
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add EMAIL_TO

# Deploy
vercel --prod
```

#### **Netlify**
1. Site settings → Environment variables
2. Add each variable
3. Redeploy

#### **Railway/Render**
1. Dashboard → Environment
2. Add variables
3. Redeploy

## 🔍 Testing

### Local Testing
```bash
# Start dev server
pnpm dev

# Open browser
http://localhost:3000

# Fill out contact form and submit
# Check console for logs if no email service configured
```

### Production Testing
1. Submit a real message
2. Verify email arrives
3. Test rate limiting (submit 4+ times)
4. Test with empty honeypot (normal user)
5. Check response times

## 🛡️ Additional Security Recommendations

### 1. **Add CAPTCHA (Optional)**
For extra protection against sophisticated bots:
```bash
pnpm add react-google-recaptcha
```

Update API route to verify CAPTCHA token.

### 2. **Use Redis for Rate Limiting (Production)**
Current in-memory store resets on server restart. For production:
```bash
pnpm add @upstash/redis
```

Replace `rateLimitStore` Map with Redis.

### 3. **Add Content Security Policy**
In `next.config.js`:
```js
headers: [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  }
]
```

### 4. **Monitor Failed Submissions**
Set up logging service (Sentry, LogRocket) to track:
- Rate limit violations
- Bot attempts (honeypot triggers)
- Failed email sends

### 5. **Database Logging (Optional)**
Store all submissions in database:
- Backup in case email fails
- Analytics on contact volume
- Spam pattern detection

## 📊 Monitoring

Watch for:
- **High rate limit violations** → Potential attack
- **Many honeypot triggers** → Bot activity
- **Failed email sends** → Service issues
- **Long response times** → Performance problems

## 🆘 Troubleshooting

### "Failed to send message" error
- Check environment variables are set
- Verify API key is correct
- Check email service dashboard for errors
- Look at server logs

### Rate limiting too strict
Update `RATE_LIMIT` in `/api/contact/route.ts`:
```typescript
const RATE_LIMIT = {
  maxRequests: 5,      // Increase limit
  windowMs: 60 * 60 * 1000,  // Or increase time window
}
```

### Emails going to spam
- Configure SPF/DKIM records (if using Resend with custom domain)
- Use professional email content
- Avoid spam trigger words
- Warm up your sending domain

## 📝 Environment Variables Reference

```bash
# Email Service (choose one)
RESEND_API_KEY=""           # Resend API key
# OR
SMTP_HOST=""                # SMTP server
SMTP_PORT=""                # Usually 587
SMTP_SECURE=""              # "true" or "false"
SMTP_USER=""                # Email username
SMTP_PASS=""                # Email password

# Email Configuration
EMAIL_FROM=""               # Sender address
EMAIL_TO=""                 # Your email address
```

## ✅ Success Criteria

Your contact form is production-ready when:
- ✅ Form submits successfully
- ✅ Emails arrive in your inbox
- ✅ Rate limiting blocks excessive requests
- ✅ Validation rejects invalid inputs
- ✅ Honeypot catches bots
- ✅ Error messages are user-friendly
- ✅ No sensitive data in error responses

---

**Need Help?**
- Resend Docs: https://resend.com/docs
- Nodemailer Docs: https://nodemailer.com
- Rate Limiting: Consider Upstash Redis for production

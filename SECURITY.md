# Security Documentation

This document outlines the security measures implemented in the portfolio website.

## 🔒 Security Features

### 1. Contact Form Security

#### **Rate Limiting**
- **Implementation**: In-memory Map with IP-based tracking
- **Configuration**: 3 requests per hour per IP
- **Response**: HTTP 429 with `Retry-After` header
- **Production Note**: Consider upgrading to Redis for distributed systems

```typescript
const RATE_LIMIT = {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
}
```

#### **Honeypot Field**
- **Purpose**: Trap automated bots
- **Implementation**: Hidden form field that should remain empty
- **Behavior**: Silently accepts but doesn't process bot submissions
- **User Impact**: None (invisible to legitimate users)

#### **Input Validation**
- **Client-side**: React Hook Form + Zod schema
- **Server-side**: Zod schema validation
- **Sanitization**: Removes `<>` characters to prevent XSS
- **Limits**:
  - Name: 2-100 characters
  - Email: Valid email format, max 255 characters
  - Message: 10-1000 characters

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0),
})
```

#### **XSS Prevention**
- Input sanitization removes HTML tags
- No user input rendered as HTML
- All outputs properly escaped
- Content-Type headers set correctly

#### **CORS Configuration**
- POST requests only from same origin in production
- Preflight requests handled with OPTIONS
- Headers properly configured

### 2. Environment Variables Security

#### **Sensitive Data Protection**
- All API keys in `.env` file
- `.env` excluded from version control
- `.env.example` provided for setup
- No secrets in client-side code

#### **Required Variables**
```bash
RESEND_API_KEY=         # Email service API key
EMAIL_FROM=             # Sender email address
EMAIL_TO=               # Your email address
NEXTAUTH_SECRET=        # Session encryption key
DATABASE_URL=           # Database connection string
```

#### **Production Checklist**
- [ ] All environment variables set on hosting platform
- [ ] `.env` in `.gitignore`
- [ ] Secrets rotated from development
- [ ] Strong NEXTAUTH_SECRET (32+ random characters)
- [ ] No console.logs exposing sensitive data

### 3. API Route Security

#### **Request Validation**
- Content-Type checking
- Body parsing with error handling
- Schema validation before processing
- IP identification from headers

#### **Error Handling**
- No stack traces in production
- Generic error messages to users
- Detailed logging server-side only
- Appropriate HTTP status codes

#### **Headers**
```typescript
'Content-Type': 'application/json'
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
```

## 🛡️ Additional Recommendations

### 1. **Content Security Policy (CSP)**

Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
          ].join('; '),
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ]
}
```

### 2. **HTTPS Enforcement**

Ensure your hosting platform:
- Redirects HTTP → HTTPS automatically
- Uses TLS 1.2 or higher
- Has valid SSL certificate
- Enables HSTS header

### 3. **Dependency Security**

```bash
# Regular security audits
pnpm audit

# Update dependencies
pnpm update

# Check for vulnerable packages
pnpm audit --fix
```

### 4. **Rate Limiting Enhancement**

For production, upgrade to Redis:

```bash
pnpm add @upstash/redis
```

```typescript
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

async function checkRateLimit(ip: string) {
  const key = `rate_limit:${ip}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 3600) // 1 hour
  }

  return count <= 3
}
```

### 5. **CAPTCHA Integration**

For additional bot protection:

```bash
pnpm add react-google-recaptcha
```

Add to contact form:
```tsx
import ReCAPTCHA from 'react-google-recaptcha'

<ReCAPTCHA
  sitekey="your-site-key"
  onChange={handleCaptchaChange}
/>
```

Verify on server:
```typescript
const verifyRecaptcha = async (token: string) => {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    }
  )
  return response.json()
}
```

### 6. **Logging & Monitoring**

Implement logging for:
- All contact form submissions
- Rate limit violations
- Honeypot triggers
- Failed email sends
- API errors

Use services like:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Vercel Analytics** - Performance monitoring
- **Uptime Robot** - Availability monitoring

### 7. **Database Security**

If storing submissions:
- Use parameterized queries (prevent SQL injection)
- Encrypt sensitive data at rest
- Regular backups
- Access control with least privilege
- Connection pooling

```typescript
// Use Prisma for safe queries
const submission = await prisma.contactSubmission.create({
  data: {
    name: sanitizedData.name,
    email: sanitizedData.email,
    message: sanitizedData.message,
  },
})
```

## 🔍 Security Audit Checklist

### Pre-Deployment
- [ ] All secrets in environment variables
- [ ] `.env` not in version control
- [ ] Input validation on client and server
- [ ] Rate limiting implemented
- [ ] Honeypot field added
- [ ] XSS prevention (sanitization)
- [ ] CORS properly configured
- [ ] Error messages don't leak info
- [ ] HTTPS enforced
- [ ] Security headers configured

### Post-Deployment
- [ ] Test rate limiting works
- [ ] Test form validation
- [ ] Verify emails arrive
- [ ] Check for XSS vulnerabilities
- [ ] Test with bot tools
- [ ] Monitor error logs
- [ ] Set up security alerts
- [ ] Run security scan (OWASP ZAP)

## 🚨 Incident Response

### If Rate Limit Attack Detected
1. Check logs for attacker IP
2. Consider blocking IP at firewall level
3. Temporarily reduce rate limit window
4. Monitor for distributed attacks

### If Spam Received
1. Check honeypot is working
2. Consider adding CAPTCHA
3. Adjust rate limits
4. Review email filtering

### If Security Vulnerability Found
1. Assess severity
2. Apply patch immediately
3. Rotate affected credentials
4. Notify users if data compromised
5. Document incident

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Resend Security](https://resend.com/docs/security)

## 🔄 Regular Security Tasks

**Weekly:**
- Review error logs
- Check rate limit violations
- Monitor email delivery rates

**Monthly:**
- Update dependencies (`pnpm update`)
- Security audit (`pnpm audit`)
- Review access logs

**Quarterly:**
- Rotate API keys
- Security penetration testing
- Review and update security policies

---

**Remember:** Security is an ongoing process, not a one-time setup. Stay informed about new vulnerabilities and best practices.

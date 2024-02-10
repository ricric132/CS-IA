import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `http://localhost:3000/confirm?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'You need to verify your email',
    html: `<p>Click <a href="${verifyLink}">here<a> to verify your email<p>`,
  })
}

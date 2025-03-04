// 'use server'

// import { z } from 'zod'
// import nodemailer from 'nodemailer'

// const schema = z.object({
//   email: z.string().email('Invalid email address')
// })

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: parseInt(process.env.SMTP_PORT || '465'),
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// })

// export async function joinWaitlist(prevState, formData) {
//   try {
//     const email = formData.get('email')
    
//     // Validate email
//     const result = schema.safeParse({ email })
//     if (!result.success) {
//       return { success: false, message: result.error.errors[0].message }
//     }

//     // Send email
//     const info = await transporter.sendMail({
//       from: `"Acme" <${process.env.SMTP_FROM_EMAIL}>`,
//       to: email,
//       subject: 'Welcome to Our Waitlist!',
//       html: `
//         <h1>Thanks for joining!</h1>
//         <p>We'll notify you when we launch.</p>
//         <p>Registered email: ${email}</p>
//       `
//     })

//     if (!info.messageId) {
//       console.error('Email failed:', info)
//       return { success: false, message: 'Failed to join waitlist' }
//     }

//     return { 
//       success: true,
//       message: 'Joined successfully! Check your email for confirmation'
//     }
//   } catch (error) {
//     console.error('Error:', error)
//     return { 
//       success: false,
//       message: 'An error occurred. Please try again.'
//     }
//   }
// }
import nodemailer from 'nodemailer';

// SECURE: Load credentials from environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

// Next.js App Router API route
export async function POST(req: Request) {
  // Check for missing environment variables
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECEIVER) {
    console.error("Missing required environment variables for sending email.");
    return new Response(JSON.stringify({ error: 'Server is not configured to send emails.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message } = await req.json();

  // Configure your transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Task Manager Contact" <${EMAIL_USER}>`,
      to: EMAIL_RECEIVER,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Message from Task Manager</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


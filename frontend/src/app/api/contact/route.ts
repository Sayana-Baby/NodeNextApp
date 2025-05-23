import nodemailer from 'nodemailer';

// WARNING: Hardcoding credentials is NOT recommended for production.
// This is for demonstration/testing only.
const EMAIL_USER = 'nygilbinoy83@gmail.com';
const EMAIL_PASS = 'MIKHAEL@83';
const EMAIL_RECEIVER = 'nygilbinoy83@gmail.com';

// Next.js App Router API route
export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  // Configure your transporter with hardcoded credentials
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
      to: EMAIL_RECEIVER || EMAIL_USER,
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


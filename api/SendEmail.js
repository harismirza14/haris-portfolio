export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    // Import nodemailer
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send' });
  }
}
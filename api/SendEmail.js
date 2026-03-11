// This is a serverless function that works with Vercel
// For local development, we'll use a different approach

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // For local development, we'll use a different approach
    // This will work when deployed to Vercel
    if (process.env.VERCEL) {
      // Use dynamic import instead of require
      const nodemailer = await import('nodemailer');
      
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        replyTo: email,
        to: process.env.GMAIL_USER,
        subject: `Portfolio Contact from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      // For local development, just log the data
      console.log('📧 Email would be sent with:', { name, email, message });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
}
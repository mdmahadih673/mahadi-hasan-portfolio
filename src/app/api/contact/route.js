import nodemailer from 'nodemailer';

const recipient = 'mdmahadih673@gmail.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]);
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Please submit a valid message.' }, { status: 400 });
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json({ error: 'Please submit a valid message.' }, { status: 400 });
  }

  // Quietly accept bot submissions without sending email.
  if (typeof data.website === 'string' && data.website.trim()) {
    return Response.json({ ok: true });
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || message.length < 10 || message.length > 4000) {
    return Response.json({ error: 'Check your name, email, and message, then try again.' }, { status: 400 });
  }

  const smtpUser = process.env.CONTACT_SMTP_USER;
  const smtpPassword = process.env.CONTACT_SMTP_PASSWORD;
  if (!smtpUser || !smtpPassword) {
    return Response.json(
      {
        code: 'email_not_configured',
        error: 'SMTP email delivery is not configured yet.',
      },
      { status: 503 }
    );
  }

  const port = Number(process.env.CONTACT_SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.CONTACT_SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: 'Mahadi Hasan Portfolio', address: smtpUser },
      to: recipient,
      replyTo: { name, address: email },
      subject: `Portfolio inquiry from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>`,
    });
  } catch (error) {
    console.error('Contact email delivery failed:', error.message);
    return Response.json({ error: 'Email could not be delivered right now. Please try again later.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}

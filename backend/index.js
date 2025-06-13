const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gafencuclaudiugabriel@gmail.com',
      pass: 'ibea sliq fofc daku'
    }
  });

  const mailOptions = {
  from: email,
  to: 'g.gafencu@yahoo.com',
  subject: 'Mesaj nou din formularul de contact',
  text: `Nume: ${name}\nEmail: ${email}\nMesaj: ${message}`,
  html: `
    <div style="font-family: 'Inter', Arial, sans-serif; color: #222;">
      <h2 style="color: #2563eb;">Ai primit un mesaj nou din portofoliul tău!</h2>
      <p><strong>Nume:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Mesaj:</strong></p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p style="font-size: 12px; color: #888;">Acest mesaj a fost trimis automat de pe <b>Gabi Gafencu Portfolio</b>.</p>
    </div>
  `
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mesaj trimis cu succes!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la trimiterea mesajului.' });
  }
});

app.listen(port, () => {
  console.log(`Serverul rulează pe http://localhost:${port}`);
});
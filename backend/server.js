require('dotenv').config({ path: './.env' }); // Ajuste o caminho para o .env

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware para lidar com as requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos (CSS, Imagens, etc.)
app.use(express.static(path.join(__dirname, '../'))); // Serve todos os arquivos da raiz do projeto

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); // Enviar o arquivo index.html
});

// Criar o transportador para o Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para enviar o e-mail
app.post('/send-email', (req, res) => {
  const { clientname, clientmail } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: clientmail,
    subject: 'Obrigado pelo contato!',
    text: `Olá, ${clientname}! Obrigado por entrar em contato. em breve entrarei em contato por e-mail. ou caso queira este é o link do meu whatsapp https://wa.me/5584987119084.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
      res.status(500).send('Erro ao enviar email.');
    } else {
      console.log('Email enviado:', info.response);
      res.send('Email enviado com sucesso!');
    }
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import Bill from '../email/Bill'; // Adjust the path as needed
import Resend from 'resend'; // Make sure this is the correct import for resend

const resend = new Resend(process.env.VITE_APP_RESEND_API_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'https://vietafood.shop',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.post('/api/send-email', async (req, res) => {
  try {
    const { order } = req.body;
    const emailContent = ReactDOMServer.renderToString(<Bill order={order} />);

    await resend.emails.send({
      from: 'duyhuynh@vietafood.shop',
      to: `${order.customerInfo.email}`,
      subject: 'Xác nhận đơn hàng',
      react: emailContent,
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// All other requests not handled will serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

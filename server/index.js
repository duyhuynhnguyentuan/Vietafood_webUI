import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Bill from '../../../../email/Bill'; // Adjust this path as needed
import Resend from 'resend'; // Make sure this is the correct import for resend

const resend = new Resend(process.env.VITE_APP_RESEND_API_KEY); // Ensure environment variable is set
const app = express();
const PORT = process.env.PORT || 5000;


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

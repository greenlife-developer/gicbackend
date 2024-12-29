const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()

// SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Endpoint to send email
app.post("/api/send-email", (req, res) => {
  const { name, address, phone, email, qualification, cv, position } = req.body;

  console.log(name, address, phone, email, qualification, cv); // Should now log the values correctly

  const msg = {
    to: "giclimited001@gmail.com", // Change to your recipient
    from: process.env.EMAIL_USER, // Change to your verified sender
    subject: "New Job Application",
    text: `Name: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nQualification: ${qualification}\nPosition: ${position}\nCV Uploaded: ${cv}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send("Email sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending email");
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

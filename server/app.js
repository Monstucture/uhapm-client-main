require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PQWsvRtKCLSPpaJZIPshbGLswOCp4M94XDzFY5pl6echsqqjN6n1xrPGUFZCmltYti6FFakJKwfjEMwMXSmJrZX00jzamBYef'); // Use environment variable for security
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Route
app.post('/payment', async (req, res) => {
    const { product, token, userInfo } = req.body;
    console.log('Received payment request for product:', product.description);

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: product.amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.description
        });

        res.status(200).json({ message: 'Payment received. Thank you now Rudolf can be glazed for the next 3 months!' });
    } catch (err) {
        console.error('Error processing payment:', err.message);
        res.status(500).json({ message: 'An error occurred while processing your payment.' });
    }
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
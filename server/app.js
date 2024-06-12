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
    console.log('Received payment request for product:', product.name);

    // Ensure userInfo is properly defined before using it
    if (!userInfo) {
        return res.status(400).json({ message: 'userInfo is required.' });
    }
    try {
        // Create customer
        const customer = await stripe.customers.create({
            email: userInfo.email,
            // You can add more customer information here if needed
        });

        // Log customer information
        console.log('Customer created:', customer);
        console.log('Customer ID:', customer.id);
        console.log('Customer Email:', customer.email);

        // You can proceed with payment processing here
        // haha
        res.status(200).send('Payment received Thank you now Rudolf can be glaze for the next 3 months!');
    } catch (err) {
        console.error('Error processing payment:', err.message);
        res.status(500).json({ message: 'Failed to process payment.' });
    }
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PQWsvRtKCLSPpaJC5xCpUa2hYnNF5z2WJLEtuJwDizdM6d3UbrhsCQUEELMPafCbIMxYi1lm6AXueYsFM1J3Q1h00dYczoMDs'); // Use environment variable for security
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');

const sheets = require('../server/sheet-client.js');

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Route
app.post('/payment', async (req, res) => {
    const { product, token, userInfo } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: userInfo.email,
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: product.amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.description
        });

        //Google sheets
        await sheets.spreadsheets.values.append({
            spreadsheetId: '1mlHNqQgSavZbStArYMdJH8IJC-NOdDPXWyg_bdTk370',
            range: 'Sheet1!A2:E2',
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
    
            //Post the body of the data
            requestBody:{
                values: [[userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.phone, userInfo.uhid]]
            }
        })
        
        res.status(200).json({ message: 'Payment received. Thank you now Rudolf can be glazed for the next 3 months!' });
    } catch (err) {
        console.error('Error processing payment:', err.message);
        res.status(500).json({ message: 'An error occurred while processing your payment.' });
    }
});

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
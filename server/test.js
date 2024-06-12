// require('dotenv').config()

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const stripe = require('stripe')('sk_test_51PQWsvRtKCLSPpaJZIPshbGLswOCp4M94XDzFY5pl6echsqqjN6n1xrPGUFZCmltYti6FFakJKwfjEMwMXSmJrZX00jzamBYef');
// const PORT = process.env.PORT || 4000;


// // script run in package.json npm run start

// //middle ware
// app.use(express.json())
// app.use(cors())


// // // store item data wip
// // const storeItems = new Map([
// //     [1, { priceInCents: 2000, name: "Semester Membership" }],
// //     [2, { priceInCents: 3500, name: "Full Year Membership" }],
// // ])


// //route
// app.post('/payment', (req, res) => {

//     const { product, token } = req.body;
//     console.log('PRODUCT', product);
//     console.log('PRICE', product.price);

//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     }).then(customers => {
//         stripe.charges.create({
//             //charge product in dollars
//             ammount: product.price * 100,
//             currency: 'usd',
//             customers: customers.id,
//             receipt_email: token.email,
//             description: `purchase of product.name`
//         }, { idempontencyKey })
//     }).then(result => res.status(200).json(result)).catch(err => console.log(err))

// })


// //listen
// app.listen(PORT, () => console.log('Server started'));

// // app.use('/api/apiRoute', apiRoute));


// working customElements
// // // Create a customer in Stripe
// const customer = await stripe.customers.create({
//     email: token.email,
//     source: token.id,
// });

// // Create a charge for the customer
// const charge = await stripe.charges.create({
//     amount: product.price * 100, // Amount in USD
//     currency: 'usd',
//     customer: customer.id, // Use customer ID here
//     receipt_email: token.email,
//     description: `Purchase of ${product.name}`,
// });

// // Send success response
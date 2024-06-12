import React, { useState } from 'react';
import { MetaData } from '../../components/Meta/MetaData';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Join.css';
import Loading from '../../components/Loading/Loading';
import { useUserInfo } from '../../components/User/UserInfo';
import { products } from '../../components/Products/Products';

const Membership = () => {
	const stripe = useStripe();
	const elements = useElements();

	const { userInfo, handleInputChange } = useUserInfo(); // Use useCustomerInfo hook

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const [selectedProduct, setSelectedProduct] = useState(products[0]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setLoading(true); // Start loading

		try {
			const cardElement = elements.getElement(CardElement);
			const { token, error } = await stripe.createToken(cardElement);

			if (error) {
				throw new Error(`Error creating token: ${error.message}`);
			}

			const body = {
				token,
				product: selectedProduct,
				userInfo,
			};
			console.log(body);
			const response = await fetch('http://localhost:4000/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			const responseData = await response.json(); // Parse the JSON response
			console.log(responseData.message); // Access the message property of the parsed JSON
			setSuccessMessage(responseData.message); // Set the success message based on the parsed JSON
		} catch (error) {
			console.error('Payment error:', error);
			setSuccessMessage('Payment failed Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const meta = {
		title: 'Join Us - APM',
		desc: 'Join our organization!',
		url: 'https://uhapm.org/join',
	};

	return (
		<div>
			<MetaData {...meta} />
			<div>
				<h2>Enter Your Information</h2>
				<form onSubmit={handleSubmit}>
					<label>
						First Name:
						<input
							type='text'
							name='firstName'
							value={userInfo.firstName}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br />
					<label>
						Last Name:
						<input
							type='text'
							name='lastName'
							value={userInfo.lastName}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br />
					<label>
						Email:
						<input
							type='email'
							name='email'
							value={userInfo.email}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br />
					<label>
						Phone Number:
						<input
							type='tel'
							name='phone'
							value={userInfo.phone}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br />
					<label>
						UHID:
						<input
							type='text'
							name='uhid'
							value={userInfo.uhid}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br />
					<h2>Select a Product</h2>
					<select value={selectedProduct.id} 
							onChange={(e) => setSelectedProduct(products.find((p) => p.id === parseInt(e.target.value)))}
					>
						{products.map((product) => (
							<option key={product.id} value={product.id}>
								{product.description} - ${product.amount}
							</option>
						))}
					</select>
					<br />
					<h2>Card Details</h2>
					<CardElement />
					<br />
					<button type='submit' disabled={!stripe || loading}>
						{loading ? <Loading /> : 'Proceed to Payment'}
					</button>
				</form>

				{successMessage && <div className='success-message'>{successMessage}</div>}
			</div>
		</div>
	);
};

export default Membership;

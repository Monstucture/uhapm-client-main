import React, { useState, Suspense } from 'react';
import { MetaData } from '../../components/Meta/MetaData';
import './Join.css';
import Loading from '../../components/Loading/Loading';
import StripeCheckout from 'react-stripe-checkout';
import StripeContainer from '../../components/Payment/StripeContainer';

const Membership = () => {
	//product detail
	const [product, setProduct] = useState({
		name: 'Full year membership',
		price: 35,
	});

	const makePayment = (token) => {
		const body = {
			token,
			product,
		};
		const headers = {
			'Content-Type': 'application/json',
		};
		return fetch(`http://localhost:4000/payment`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body)
		}).then(response => {
			console.log('RESPONSE ', response);
			const { status } = response;
			console.log('STATUS ', status);
		})
			.catch(error => console.log(error));
	}


	const meta = {
		title: 'Join Us - APM',
		desc: 'Join our organization!.',
		url: 'https://uhapm.org/join',
	};

	return (
		<div>
			<MetaData {...meta} />
			<Suspense fallback = {<Loading />}>
				<StripeCheckout
					stripeKey = 'pk_test_51PQWsvRtKCLSPpaJyEpXRenofqGyD4zbYZlMbXzo13kxTU4FrRTy9tlWlyQj8rGyXQQjXAAEQWB0Ai2LWZosnWLW00tzSpk299'
					token = {makePayment}
					name = 'APM PAYMENT'
					ammount = {product.price * 100} //Price in dollars
				>
					<button>Give Ruldof money for Jones</button>
				</StripeCheckout>
				{/* <StripeContainer /> */}
			</Suspense>
		</div>
	);
};
export default Membership;

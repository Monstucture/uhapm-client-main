import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useUserInfo } from '../context/UserInfoContext'; // Import useUserInfo hook
import { products } from '../components/Products'; // Import products

const PaymentHandler = ({
    stripe,
    elements,
    userInfo,
    handleInputChange,
    setLoading,
    setSuccessMessage,
}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            console.error('Error creating token:', error);
            setLoading(false);
            return;
        }

        const body = {
            token,
            product: products.find((p) => p.id === selectedProduct.id), // Assuming selectedProduct is available
            userInfo,
        };

        // Fetch request send to '/payment'
        // Handle response and update state 
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Card Element and other form elements */}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? <Loading /> : 'Proceed to Payment'}
            </button>
        </form>
    );
};

export default PaymentHandler;
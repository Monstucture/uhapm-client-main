
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './Payment'

const PUBLIC_KEY ='pk_test_51PQWsvRtKCLSPpaJyEpXRenofqGyD4zbYZlMbXzo13kxTU4FrRTy9tlWlyQj8rGyXQQjXAAEQWB0Ai2LWZosnWLW00tzSpk299'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}
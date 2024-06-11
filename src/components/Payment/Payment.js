import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState } from 'react'


const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#000000',
            color: '#000000',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#000000' },
            '::placeholder': { color: '#000000' }
        },
        invalid: {
            iconColor: '#000000',
            color: '#000000'
        }
    }
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:4000/payment', {
                    amount: 1000,
                    id
                })

                if (response.data.success) {
                    console.log('Successful payment')
                    setSuccess(true)
                }

            } catch (error) {
                console.log('Error', error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className='FormGroup'>
                        <div className='FormRow'>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button>PAY</button>
                </form>
                :
                <div>
                    <h2>You just glaze Rudolf for another 3 months congrats this is the best decision of you're life!</h2>
                </div>
                //    once the payment success hide the form then display this msg
            }

        </>
    )
}
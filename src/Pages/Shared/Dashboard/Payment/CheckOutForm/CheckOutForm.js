import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useTitle from '../../../../../Hooks/useTitle';

const CheckOutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    useTitle('CheckOut')

    const price = order.sellingPrice;

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://carx-delta.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else if (paymentMethod) {
            setCardError(paymentMethod.message)
        } else {
            setCardError('')
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: order.bookedByName,
                    email: order.bookedByName
                },
            },
        })
            .then(function (result) {
                console.log(error);
            });

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }

        console.log('Payment Intent: ', paymentIntent);

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-2' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError}</p>
        </>
    );
};

export default CheckOutForm;
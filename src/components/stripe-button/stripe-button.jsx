import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IAkF8Bbado7lwRX9I9R7C2WQJ67I5EYDrWZs2tiq8ZWz3VAE4HYZNxRPx1j3c0xv3uZhQsWGOLYVtmaxlVYGKCb001h2x4Eqa';
    
    // onToken = token => {...}

    return(
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            // token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
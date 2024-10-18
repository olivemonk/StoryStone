import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <PayPalScriptProvider
            options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
        >
            {children}
        </PayPalScriptProvider>
    );
};

export default PaypalProvider;

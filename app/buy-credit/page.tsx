'use client';

import { UserDetailsContext } from '@/components/context/user-details-context';
import { db } from '@/config/db';
import { users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {toast} from 'sonner'

const BuyCreditPage = () => {
    const Options = useMemo(
        () => [
            {
                id: 1,
                price: 1.99,
                credits: 10,
            },
            {
                id: 2,
                price: 2.99,
                credits: 30,
            },
            {
                id: 3,
                price: 4.99,
                credits: 70,
            },
            {
                id: 4,
                price: 9.99,
                credits: 150,
            },
        ],
        []
    );

    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const router = useRouter();

    useEffect(() => {
        if (selectedOption !== 0) {
            const price = Options[selectedOption - 1].price;
            setSelectedPrice(price);
        }
    }, [Options, selectedOption]);

    const onPaymentSuccess = async () => {
        const result = await db
            .update(users)
            .set({
                credits:
                    userDetails.credits + Options[selectedOption - 1].credits,
            })
            .where(eq(users.userEmail, userDetails.userEmail));

        if (result) {
            toast.success('Payment Successful');
            setUserDetails((prev: any) => ({
                ...prev,
                ['credits']: prev.credits + Options[selectedOption - 1].credits,
            }));
            router.replace('/dashboard');
        } else {
            toast.error('Payment Failed');
        }
    };
    return (
        <div className="min-h-screen p-10 md:px-20 lg:px-40 text-center ">
            <h2 className="text-3xl text-primary font-bold">
                Add more credits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 items-center justify-center">
                <div>
                    {Options.map((option) => (
                        <div
                            className={`px-6 py-3 my-3  hover:bg-black/60 text-center rounded-md cursor-pointer hover:scale-105 transition-all ${
                                selectedOption === option.id
                                    ? 'bg-black/60' // This applies when the option is selected
                                    : 'bg-primary'
                            }`}
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)} // Correctly updating the selected option
                        >
                            <h2 className="text-xl">
                                Get {option.credits} Credits = {option.credits}{' '}
                                Story
                            </h2>
                            <h2 className='font-bold text-2xl mt-1'>${option.price}</h2>
                        </div>
                    ))}
                </div>
                <div>
                    {!!selectedPrice && (
                        <PayPalButtons
                            style={{ layout: 'vertical' }}
                            disabled={selectedOption === 0}
                            // @ts-expect-error - The value is not used
                            onApprove={() => {
                                onPaymentSuccess();
                            }}
                            onCancel={() => {
                                toast.error('Payment Cancelled');
                                setSelectedOption(0);
                                setSelectedPrice(0);
                            }}
                            createOrder={(data, actions) => {
                                // @ts-expect-error - The value is not used
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: selectedPrice.toFixed(2),
                                                currency_code: 'USD',
                                            },
                                        },
                                    ],
                                });
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyCreditPage;

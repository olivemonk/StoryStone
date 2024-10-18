'use client';

import { db } from '@/config/db';
import { users } from '@/config/schema';
import { NextUIProvider } from '@nextui-org/react';
import { eq } from 'drizzle-orm';
import React, { use, useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserDetailsContext } from '../context/user-details-context';
import PaypalProvider from './paypal-provider';

function Provider({ children }: { children: React.ReactNode }) {
    const [userDetails, setUserDetails] = useState<any>();
    const { user } = useUser();

    const saveNewUserIfNotExists = useCallback(async () => {
        const userData = await db
            .select()
            .from(users)
            .where(
                eq(
                    users.userEmail,
                    user?.primaryEmailAddress?.emailAddress ?? ''
                )
            );

        if (!userData[0]) {
            const result = await db
                .insert(users)
                .values({
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                })
                .returning({
                    userEmail: users.userEmail,
                    userName: users.userName,
                    userImage: users.userImage,
                    credits: users.credits,
                });
            setUserDetails(result[0]);
        } else {
            setUserDetails(userData[0]);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            saveNewUserIfNotExists();
        }
    }, [saveNewUserIfNotExists, user]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            <PaypalProvider>
                <NextUIProvider>{children}</NextUIProvider>
            </PaypalProvider>
        </UserDetailsContext.Provider>
    );
}

export default Provider;

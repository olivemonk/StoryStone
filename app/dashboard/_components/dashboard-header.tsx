'use client';

import { UserDetailsContext } from '@/components/context/user-details-context';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

const DashboardHeader = () => {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    return (
        <div className="p-7 bg-primary w-full text-white flex items-center justify-between rounded-md">
            <h2 className="font-semibold text-2xl">My Stories</h2>
            <div className="flex item-center justify-between gap-2">
                <Image src={'/rupee.png'} alt="rupee" width={30} height={30} />
                {userDetails && <span className="mt-1">{userDetails.credits} Credits left</span>}
            </div>
            <Link href={'buy-credit'}>
            <Button className='bg-indigo-200 font-semibold'>Buy more credits</Button>
            </Link>
        </div>
    );
};

export default DashboardHeader;

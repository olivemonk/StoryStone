import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-flow-cols-1 md:grid-cols-2 gap-10 pt-10">
            <div>
                <Image
                    src={'/login.jpg'}
                    alt="login"
                    width={700}
                    height={1000}
                    className="w-full md:h-screen object-contain"
                />
            </div>
            <div className="flex justify-center items-center order-first md:order-last ">{children}</div>
        </div>
    );
};

export default AuthLayout;

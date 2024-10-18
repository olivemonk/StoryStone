import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

function ProviderClerk({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>;
}

export default ProviderClerk;

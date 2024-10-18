import { Button } from '@nextui-org/button';
import React from 'react';

const LastPage = () => {
    return (
        <div className="bg-primary p-10 h-full flex flex-col gap-4 items-center justify-center">
            <h2 className="text-center text-xl text-white">End of the story</h2>
            <div className="flex items-center justify-center">
                <Button color='secondary'>Share</Button>
            </div>
        </div>
    );
};

export default LastPage;

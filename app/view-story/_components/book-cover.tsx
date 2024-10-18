import Image from 'next/image';
import React from 'react';

const BookCover = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Image 
                src={imageUrl} 
                alt="cover" 
                layout="responsive" // Ensures it adapts to its container
                width={300} 
                height={500} 
                className="object-contain" // Ensures full coverage without stretching
                style={{ boxShadow: 'none' }} // Remove shadows
            />
        </div>
    );
};

export default BookCover;

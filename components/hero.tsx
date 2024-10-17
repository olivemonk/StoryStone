import { Button } from '@nextui-org/button';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div className="px-10 md:px-20 lg:px-44 mt-10 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-40">
                <div className="flex flex-col my-10">
                    <h2 className="text-[40px] text-primary font-bold py-5">
                        Craft magical stories for the kids in minutes.
                    </h2>
                    <p className="text-lg text-primary font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        In sint eius exercitationem accusantium enim! Dolorum
                        debitis porro facilis placeat magnam.
                    </p>
                    <Button size="lg" className="mt-5" color="primary">
                        Create Story
                    </Button>
                </div>
                <div>
                    <Image
                        src={'/hero.webp'}
                        alt="hero"
                        width={500}
                        height={500}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;

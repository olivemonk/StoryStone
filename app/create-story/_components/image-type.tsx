'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { OptionField } from './story-type';

const ImageType = ({userSelection}: any) => {
    const OptionList = [
        {
            label: '3D',
            imageUrl: '/3d.webp',
            isFree: true,
        },
        {
            label: 'Paper-Cut',
            imageUrl: '/paper.webp',
            isFree: true,
        },
        {
            label: 'Watercolor',
            imageUrl: '/ater.webp',
            isFree: true,
        },
    ];

    const [selectedOption, setSelectedOption] = useState('');
    const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.label);

        userSelection({
            fieldValue: item.label,
            fieldName: 'imageStyle',
        })

    }

    return (
        <div>
            <label className="font-bold text-2xl text-primary">
                {' '}
                Image style
            </label>
            <div className="grid grid-cols-3 gap-5 mt-2">
                {OptionList.map((option) => (
                    <div
                        key={option.imageUrl}
                        className={`relative ${
                            selectedOption === option.label
                                ? 'grayscale-0 border-3 rounded-lg border-primary'
                                : 'grayscale'
                        } hover:grayscale-0 cursor-pointer p-0.5`}
                        onClick={() => onUserSelect(option)}
                    >
                        <h2 className=" text-lg absolute bottom-2 text-center w-full z-10 text-white">
                            {option.label}
                        </h2>
                        <Image
                            src={option.imageUrl}
                            alt={option.label}
                            width={300}
                            height={500}
                            className="object-cover h-[200px] rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageType;

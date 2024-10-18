'use client';

import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import BookCover from '../_components/book-cover';
import StoryPage from '../_components/story-page';
import LastPage from '../_components/last-page';
import {
    IoIosArrowDroprightCircle,
    IoIosArrowDropleftCircle,
} from 'react-icons/io';

const ViewStory = ({ params }: { params: { storyId: string } }) => {
    const [story, setStory] = useState();
    const [count, setCount] = useState(0);
    const [playingPage, setPlayingPage] = useState<number | null>(null);
    const bookRef = useRef(null); // Initialize ref correctly

    useEffect(() => {
        getStory();
    }, [params.storyId]);

    const getStory = async () => {
        const result = await db
            .select()
            .from(storyData)
            .where(eq(storyData.storyId, params.storyId));

        setStory(result[0]);
    };

    if (!story) return <div>Loading...</div>;

    return (
        <div className="p-10 md:px-20 lg:px-40 w-full flex flex-col items-center h-screen">
            <h2 className="font-semibold text-3xl text-center bg-primary text-white px-10 py-4 w-full">
                {story?.output?.story_name}
            </h2>

            <div className="flex justify-center items-center w-full mt-10">
                {count !== 0 && (
                    <div
                        className="text-3xl text-primary cursor-pointer"
                        onClick={() => {
                            bookRef.current?.pageFlip().flipPrev();
                            setCount((prev) => prev - 1);
                        }}
                    >
                        <IoIosArrowDropleftCircle />
                    </div>
                )}

                {/* Book Component */}
                <HTMLFlipBook
                    width={400}
                    height={500}
                    showCover={true}
                    useMouseEvents={false}
                    ref={bookRef}
                >
                    <div>
                        <BookCover imageUrl={story?.coverImage} />
                    </div>
                    {story?.output?.chapters.map((chapter, index) => (
                        <div key={index} className="bg-white p-10 border">
                            <StoryPage
                                storyChapter={chapter}
                                isPlaying={playingPage === index}
                                onPlay={() => setPlayingPage(index)}
                                onStop={() => setPlayingPage(null)}
                            />
                        </div>
                    ))}
                    <div>
                        <LastPage />
                    </div>
                </HTMLFlipBook>

                {/* Next Button */}
                {count !== story?.output?.chapters.length - 1 && (
                    <div
                        className="text-3xl text-primary cursor-pointer"
                        onClick={() => {
                            bookRef.current?.pageFlip().flipNext();
                            setCount((prev) => prev + 1);
                        }}
                    >
                        <IoIosArrowDroprightCircle />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewStory;

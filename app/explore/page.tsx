'use client';

import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import StoryItemCard from '../dashboard/_components/story-item-card';
import { StoryItemType } from '../dashboard/_components/user-story-list';
import { Button } from '@nextui-org/button';

const ExplorePage = () => {
    const [offset, setOffset] = useState(0);
    const [storyList, setStoryList] = useState<any>([]);

    const getAllStories = async (offset: number) => {
      setOffset(offset);
        const result = await db
            .select()
            .from(storyData)
            .orderBy(desc(storyData.id))
            .limit(10)
            .offset(offset);

        setStoryList((prev) => [...prev, ...result]);
    };

    useEffect(() => {
        getAllStories(offset);
    }, []);

    return (
        <div className="min-h-screen p-10 md:px-20 lg:px-40">
            <h2 className="text-2xl font-bold text-primary text-center">
                Explore more stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
                {storyList.map((story: StoryItemType) => (
                    <StoryItemCard key={story.id} story={story} id={story.id} />
                ))}
            </div>
            <div className='flex justify-center mt-10'>
                <Button onClick={() => getAllStories(offset+8)} color="primary">Load more</Button>
            </div>
        </div>
    );
};

export default ExplorePage;

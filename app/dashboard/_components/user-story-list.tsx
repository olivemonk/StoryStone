'use client';

import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useCallback, useState } from 'react';
import StoryItemCard from './story-item-card';
import CustomLoader from '@/app/create-story/_components/custom-loader';

export type StoryItemType = {
    id: number;
    storySubject: string;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
    output: object;
    coverImage: string;
    storyId: string;
    userEmail: string;
    userName: string;
    userImage: string;
};

const UserStoryList = () => {
    const { user } = useUser();
    const [storyList, setStoryList] = React.useState<StoryItemType[]>([]);
    const [loading, setLoading] = useState(true);

    const getUserStory = useCallback(async () => {
        const result: any = await db
            .select()
            .from(storyData)
            .where(
                eq(
                    storyData.userEmail,
                    user?.primaryEmailAddress?.emailAddress ?? ''
                )
            )
            .orderBy(desc(storyData.id));

        console.log(result);
        setStoryList(result);
        setLoading(false);
    }, [user]);

    useEffect(() => {
        if (user) {
            getUserStory();
        }
    }, [getUserStory, user]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
                {storyList.map((story: StoryItemType) => (
                    <StoryItemCard key={story.id} story={story} id={story.id} />
                ))}
            </div>
            <CustomLoader loading={loading} />
        </div>
    );
};

export default UserStoryList;

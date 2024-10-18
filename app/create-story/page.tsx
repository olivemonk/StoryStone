'use client';

import React, { useContext } from 'react';
import StorySubjectInput from './_components/story-subject-input';
import StoryType from './_components/story-type';
import AgeGroup from './_components/age-group';
import ImageType from './_components/image-type';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/gemini';
import { db } from '@/config/db';
import { storyData, users } from '@/config/schema';
import { toast } from 'sonner';
import uuid4 from 'uuid4';
import axios from 'axios';
import CustomLoader from './_components/custom-loader';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { UserDetailsContext } from '@/components/context/user-details-context';
import { eq } from 'drizzle-orm';
import { storage } from '@/config/firebase-config';
import {
    getDownloadURL,
    ref,
    updateMetadata,
    uploadString,
} from 'firebase/storage';

export interface FieldData {
    fieldName: 'string';
    fieldValue: 'string';
}

export interface FormDataType {
    storySubject: string;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
}

const PROMPT = process.env.NEXT_PUBLIC_GEMINI_PROMPT;

const CreateStoryPage = () => {
    const [formData, setFormData] = React.useState<FormDataType>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const onHandleUserSelection = (data: FieldData) => {
        setFormData((prev: any) => ({
            ...prev,
            [data.fieldName]: data.fieldValue,
        }));
    };
    const router = useRouter();
    const { user } = useUser();
    const { userDetails } = useContext(UserDetailsContext);

    const generateStory = async () => {
        if (!PROMPT || !formData) {
            toast.error('Enter the prompt and select all fields');
            return;
        }

        if (userDetails.credits <= 0) {
            toast.error('You do not have enough credits');
            return;
        }
        setLoading(true);
        // generate prompt
        const finalPrompt = PROMPT?.replace(
            '{ageGroup}',
            formData?.ageGroup ?? ''
        )
            .replace('{storyType}', formData?.storyType ?? '')
            .replace('{imageStyle}', formData?.imageStyle ?? '')
            .replace('{storySubject}', formData?.storySubject ?? '');
        try {
            if (!finalPrompt) {
                throw new Error('Prompt not generated');
            }
            const result = await chatSession.sendMessage(finalPrompt);
            const storyGenerated = JSON.parse(result.response.text());
            const image = await axios.post('/api/generate-image', {
                prompt:
                    'Add text with title: ' +
                    storyGenerated.story_name +
                    ' in bold text for a book cover, ' +
                    storyGenerated.cover_image.description,
            });

            console.log(image.data);

            // const imageResult = await axios.post('/api/save-image', {
            //     base64Image: image.data.data,
            // });
            const imageResult = await uploadImage(image.data.data);

            // console.log(imageResult.data);

            // save in db
            const resp = await saveInDB(storyGenerated, imageResult);
            console.log(resp);
            toast.success('Story generated successfully');
            await updateUserCredits();
            router.replace(`/view-story/${resp[0]?.storyId}`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Error generating story');
        }

        // generate story cover image
    };

    const uploadImage = async (base64Image: string) => {
        const cleanedBase64Image = base64Image.replace(
            /^data:image\/\w+;base64,/,
            ''
        );
        const fileName = `/ai-story/${Date.now()}.png`;
        const imageRef = ref(storage, fileName);

        // Upload the base64 image directly to Firebase Storage
        await uploadString(imageRef, cleanedBase64Image, 'base64');

        const metadata = {
            contentType: 'image/png',
            contentDisposition: 'inline',
        };
        await updateMetadata(imageRef, metadata);

        // Get download URL of uploaded image
        const downloadURL = await getDownloadURL(imageRef);

        return downloadURL;
    };

    const saveInDB = async (output: string, coverImage: string) => {
        setLoading(true);
        let parsedOutput;
        try {
            parsedOutput =
                typeof output === 'string' ? JSON.parse(output) : output;
        } catch (error) {
            console.log('Error parsing output:', error);
            parsedOutput = output; // fallback to plain text
        }
        const recordId = uuid4();
        try {
            const result = await db
                .insert(storyData)
                .values({
                    storyId: recordId,
                    ageGroup: formData?.ageGroup ?? '',
                    imageStyle: formData?.imageStyle ?? '',
                    storySubject: formData?.storySubject ?? '',
                    storyType: formData?.storyType ?? '',
                    output: parsedOutput,
                    coverImage,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                })
                .returning({ storyId: storyData.storyId });
            setLoading(false);
            return result;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateUserCredits = async () => {
        const result = await db
            .update(users)
            .set({
                credits: Number(userDetails?.credits - 1),
            })
            .where(
                eq(
                    users.userEmail,
                    user?.primaryEmailAddress?.emailAddress ?? ''
                )
            )
            .returning({ id: users.id });
    };

    return (
        <div className="px-20 lg:px-40 min-h-screen">
            <h2 className="font-bold text-[30px] text-primary text-center mt-10">
                Create your story
            </h2>
            <p className="text-xl text-primary text-center mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque excepturi totam, molestias sint quis recusandae sunt
                facilis dicta accusantium culpa!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <StorySubjectInput userSelection={onHandleUserSelection} />
                <StoryType userSelection={onHandleUserSelection} />
                <AgeGroup userSelection={onHandleUserSelection} />
                <ImageType userSelection={onHandleUserSelection} />
            </div>
            <div className="flex flex-col items-end py-10">
                <Button
                    color="primary"
                    className=" py-2 px-4 text-lg"
                    onClick={generateStory}
                    disabled={loading}
                >
                    Generate story
                </Button>
                <span className="text-tiny mt-1 mr-5 text-black">
                    1 credit will be used.
                </span>
            </div>
            <CustomLoader loading={loading} />
        </div>
    );
};

export default CreateStoryPage;

'use client';

import React from 'react';
import StorySubjectInput from './_components/story-subject-input';
import StoryType from './_components/story-type';
import AgeGroup from './_components/age-group';
import ImageType from './_components/image-type';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/gemini';
import { db } from '@/config/db';
import { storyData } from '@/config/schema';
import uuid4 from 'uuid4';
import axios from 'axios';
import CustomLoader from './_components/custom-loader';

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

    const generateStory = async () => {
        if (!PROMPT || !formData) {
            throw new Error('Prompt or form data is missing');
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

            const imageResult = await axios.post('/api/save-image', {
                base64Image: image.data.data,
            })

            console.log(imageResult.data);


            // save in db
            const resp = await saveInDB(storyGenerated, imageResult.data.data);
            console.log(resp);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

        // generate story cover image
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
                    coverImage
                })
                .returning({ storyId: storyData.storyId });
            setLoading(false);
            return result;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
            <div className="flex justify-end py-10">
                <Button
                    color="primary"
                    className=" py-2 px-4 text-lg"
                    onClick={generateStory}
                    disabled={loading}
                >
                    Generate story
                </Button>
            </div>
            <CustomLoader loading={loading} />
        </div>
    );
};

export default CreateStoryPage;

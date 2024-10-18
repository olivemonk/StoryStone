import { Textarea } from '@nextui-org/input';
import React from 'react';

const StorySubjectInput = ({ userSelection }: any) => {
    return (
        <div>
            <label className="font-bold text-2xl text-primary">
                {' '}
                Subject of the story
            </label>
            <Textarea
                placeholder="Write the subject of the story..."
                size="lg"
                classNames={{
                    input: 'resize-y min-h-[187px] text-xl p-2',
                }}
                className="mt-2 "
                onChange={(e) =>
                    userSelection({
                        fieldValue: e.target.value,
                        fieldName: 'storySubject',
                    })
                }
            />
        </div>
    );
};

export default StorySubjectInput;

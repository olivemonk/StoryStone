import React, { use, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { FaPauseCircle } from 'react-icons/fa';

const StoryPage = ({ storyChapter, isPlaying, onPlay, onStop }: any) => {

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);
    
    const playSpeech = (text: string) => {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create new utterance
        const synth = window.speechSynthesis;
        const textToSpeech = new SpeechSynthesisUtterance(text);

        // Start speaking
        onPlay();
        synth.speak(textToSpeech);

        // Stop playing once speech is finished
        textToSpeech.onend = () => {
            onStop();
        };
    };


    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary flex justify-between items-center">
                {storyChapter.chapter_title}
                <span className="text-lg cursor-pointer">
                    {isPlaying ? (
                        <FaPauseCircle
                            onClick={() => {
                                window.speechSynthesis.cancel();
                                onStop();
                            }}
                        />
                    ) : (
                        <FaPlayCircle
                            onClick={() =>
                                playSpeech(
                                    'Chapter : ' +
                                        storyChapter.chapter_title +
                                        ', ' +
                                        storyChapter.description
                                )
                            }
                        />
                    )}
                </span>
            </h2>
            <p className="text-lg text-black mt-3 p-10 rounded-lg bg-slate-100">
                {storyChapter.description}
            </p>
        </div>
    );
};

export default StoryPage;

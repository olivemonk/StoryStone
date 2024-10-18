import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: 'user',
            parts: [
                {
                    text:
                        'create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and Maljic School, give me 5 chapter, With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format',
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text:
                        '```json\n{\n  "story_name": "The Boy and the Maljic School",\n  "cover_image": {\n    "description": "A boy with bright eyes and a curious grin stands before a colorful, swirling portal. The portal is made of paper, with stars, planets, and whimsical creatures peeking through. Behind the boy, a lush green forest unfolds, while the portal leads to a fantastical world of swirling colors and glowing stars.",\n    "style": "Paper cut"\n  },\n  "chapters": [\n    {\n      "chapter_title": "The Curious Boy",\n      "description": "A young boy, Leo, with messy brown hair and bright blue eyes, sits in his treehouse. He’s surrounded by books, maps, and a telescope, gazing up at the starry sky. A mischievous glint shines in his eyes as he reads a book titled \'The Secrets of Maljic School\'.",\n      "image_prompt": "A paper cut illustration of a boy with brown hair and blue eyes, sitting in a treehouse with books, maps, and a telescope. The boy is looking up at a starry sky with a curious expression. The treehouse is made of paper and surrounded by leaves and branches. The book titled \'The Secrets of Maljic School\' is open on his lap.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "The Whispering Portal",\n      "description": "Leo, clutching a book about Maljic School, stumbles upon a hidden clearing in the forest. In the center, a shimmering portal made of paper swirls with colors and light. Tiny creatures peek out from the portal, beckoning him closer.",\n      "image_prompt": "A paper cut illustration of a boy holding a book, standing in a clearing in the forest. In the center of the clearing is a swirling, colorful portal made of paper. Tiny creatures, like butterflies, fairies, and stars, peek out from the portal. The forest around the clearing is made of paper with trees and flowers.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "Welcome to Maljic School",\n      "description": "Leo steps through the portal and finds himself in a magical world.  He’s greeted by a friendly, paper-cut owl with big, wise eyes.  The owl introduces him to the Maljic School, a building made of paper with whimsical turrets and colorful windows.",\n      "image_prompt": "A paper cut illustration of a boy standing in a magical world with a paper-cut owl beside him. The owl has big, wise eyes and a friendly smile. The boy is looking up at the Maljic School, a building made of paper with whimsical turrets and colorful windows. The world around them is filled with paper-cut trees, flowers, and clouds.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "Learning Magic",\n      "description": "Inside the Maljic School, Leo learns about the wonders of magic.  He practices levitating paper balls with a mischievous smile, learns to make paper flowers bloom, and even discovers how to create paper constellations in the sky.",\n      "image_prompt": "A paper cut illustration of the boy inside the Maljic School, practicing magic. He is levitating a paper ball with a mischievous smile.  Around him, paper flowers are blooming and paper constellations are forming in the sky.  The room is filled with books, scrolls, and other magical items.",\n      "style": "Paper cut"\n    },\n    {\n      "chapter_title": "The Return Home",\n      "description": "After a magical adventure, Leo bids farewell to the Maljic School. He steps back through the portal, carrying the knowledge and wonder of magic in his heart.  He returns to his treehouse, now with a new understanding of the world and the magic that exists within it.",\n      "image_prompt": "A paper cut illustration of the boy waving goodbye to the paper-cut owl and the Maljic School. He steps back through the swirling portal, carrying a book and a mischievous smile.  The forest and his treehouse are visible through the portal, with the starry sky above.",\n      "style": "Paper cut"\n    }\n  ]\n}\n``` \n',
                },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
// console.log(result.response.text());

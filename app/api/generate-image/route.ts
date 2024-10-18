import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

async function streamToBuffer(stream: ReadableStream) {
    const reader = stream.getReader();
    const chunks = [];

    let done, value;
    while (!done) {
        ({ done, value } = await reader.read());
        if (value) {
            chunks.push(value);
        }
    }

    return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { prompt } = data;

        if (!prompt || !process.env.REPLICATE_API_TOKEN) {
            return NextResponse.json({ error: "Invalid request. Prompt or API token is missing." }, { status: 400 });
        }

        console.log("Prompt received:", prompt);

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const input = {
            prompt,
            go_fast: true,
            megapixels: "0.25",
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            output_quality: 80,
            num_inference_steps: 4,
        };

        const output = await replicate.run("black-forest-labs/flux-schnell", { input });

        if (output && output.length > 0 && output[0] instanceof ReadableStream) {
            console.log("Processing ReadableStream...");

            const buffer = await streamToBuffer(output[0]); 
            const base64Image = buffer.toString('base64');   
            const imageDataUrl = `data:image/png;base64,${base64Image}`;  

            // console.log("Base64 image generated:", imageDataUrl);

            return NextResponse.json({ data: imageDataUrl });
        } else {
            console.error("Unexpected response format or no output.");
            return NextResponse.json({ error: "No valid image stream generated." }, { status: 500 });
        }

    } catch (error) {
        console.error("Error generating image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

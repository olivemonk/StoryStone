import { storage } from '@/config/firebase-config';
import { getDownloadURL, ref, updateMetadata, uploadString } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { base64Image } = data;

        const cleanedBase64Image = base64Image.replace(/^data:image\/\w+;base64,/, '');

        // Generate unique filename
        const fileName = `/ai-story/${Date.now()}.png`;
        const imageRef = ref(storage, fileName);

        // Upload image to Firebase (base64)
        await uploadString(imageRef, cleanedBase64Image, 'base64');

        // Set metadata for the image
        const metadata = {
            contentType: 'image/png',
            contentDisposition: 'inline',
        };
        await updateMetadata(imageRef, metadata);

        // Get download URL of uploaded image
        const downloadURL = await getDownloadURL(imageRef);

        // Return the download URL to the client
        return NextResponse.json({ data: downloadURL });

    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}

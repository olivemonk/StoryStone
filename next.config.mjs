/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['firebasestorage.googleapis.com']
    },
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;

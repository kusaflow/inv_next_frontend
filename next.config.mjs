/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['kusaflow.github.io', 'utfs.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kusaflow.github.io',
                port :''
            }, 
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port :''
            }
        ],
    }
};

export default nextConfig;

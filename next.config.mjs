/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['kusaflow.github.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kusaflow.github.io',
                port :''
            }
        ],
    }
};

export default nextConfig;

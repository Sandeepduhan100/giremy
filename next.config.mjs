/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // Use an array of objects to specify remote patterns
        remotePatterns: [
            {
                // Use the 'hostname' key instead of 'host'
                hostname: 'media.graphassets.com'
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;

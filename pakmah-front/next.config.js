/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "cdn.discordapp.com",
            "static.wikia.nocookie.net",
            "c4.wallpaperflare.com",
            "tr.rbxcdn.com",
        ],
    },
};

module.exports = nextConfig;

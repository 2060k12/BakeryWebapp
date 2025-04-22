/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      "plus.unsplash.com",
      "hamrobazar.s3.ap-southeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;

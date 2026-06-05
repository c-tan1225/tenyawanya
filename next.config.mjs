/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 外部画像を使う場合はここにドメインを追加（例: Instagram CDN 等）
    remotePatterns: [],
  },
};

export default nextConfig;

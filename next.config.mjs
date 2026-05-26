/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the HMR connection from your local network

  devIndicators: {
    appIsrStatus: false, // Optional: cleans up the UI
  },
  // Add this block to allow the dev server to accept the connection
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;

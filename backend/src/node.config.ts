module.exports = {
  async headers() {
    return [
      {
        // Matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST" },
          // { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

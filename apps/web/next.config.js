/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/phrase-web/1",
        permanent: true,
      },
    ];
  },
};

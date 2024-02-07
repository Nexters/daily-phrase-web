const path = require("path");
const stylexPlugin = require("@stylexjs/nextjs-plugin");

/** @type {import('next').NextConfig} */
module.exports = stylexPlugin({
  aliases: {
    "~/*": [path.join(__dirname, "*")],
  },
  rootDir: __dirname,
})({
  reactStrictMode: true,
});

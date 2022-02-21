const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
    };
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    config.module.rules.push({
      test: /\.(j|t)(s|sx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ["@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript"]
      }
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@solana/wallet-adapter-react": path.resolve(
        "./node_modules/@solana/wallet-adapter-react"
      ),
    };
    return config;
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {};
const webpack = require("webpack");

const { parsed: myEnv } = require("dotenv").config({});

module.exports = {
  images: {
    domains: ["assets.aceternity.com", "i.etsystatic.com"],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

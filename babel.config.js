module.exports = {
  presets: ["babel-preset-expo"], // or 'module:metro-react-native-babel-preset' if not Expo
  plugins: [
    ["module:react-native-dotenv", {
      moduleName: "@env",
      path: ".env",
      blocklist: null,
      allowlist: null,
      safe: false,
      allowUndefined: true,
    }]
  ]
};

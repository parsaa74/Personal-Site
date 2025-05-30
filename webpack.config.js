module.exports = {
  ignoreWarnings: [
    {
      module: /node_modules\/@mediapipe/,
    },
    {
      module: /vision_bundle\.mjs/,
    },
  ],
  resolve: {
    fallback: {
      "path": false,
      "fs": false
    }
  }
}; 
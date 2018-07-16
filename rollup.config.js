// rollup.config.js
export default [
  {
    input: 'src/content/index.js',
    output: {
      file: 'dist/content.js',
      format: "iife"
    }
  },
  {
    input: 'src/popup/index.js',
    output: {
      file: 'dist/popup.js',
      format: "iife"
    }
  }
];
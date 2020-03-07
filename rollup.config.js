import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: "cjs",
      file: "src/bundle.cjs.js",
      sourcemap: true
    },
    {
      format: "es",
      file: "src/bundle.esm.js",
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      exclude: ['node_modules/**'],
      typescript: require('typescript')
    }),
  ]
};

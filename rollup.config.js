import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: true
    },
    {
      format: 'umd',
      file: 'dist/buried.min.js',
      name: 'Buried',
      sourcemap: false
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ]
};

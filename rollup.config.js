import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/constants.ts',
  dest: 'dist/bundle.js',
  sourceMap: true,
  format: 'iife',

  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
};

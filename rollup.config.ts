/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript(),
    uglify(),
  ],
  output: {
    dir: './build',
    format: 'umd',
    name: 'heap',
  },
};

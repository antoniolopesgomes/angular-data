import * as ts from 'typescript';
import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

class RollupNG2 {
  constructor(options) {
    this.options = options;
  }
  resolveId(id, from) {
    if (id.startsWith('rxjs/')) {
      return `${__dirname}/node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
    }
  }
}
const rollupNG2 = (config) => new RollupNG2(config);

export default {
  entry: './index.ts',
  dest: './dist/data.1.0.0-alpha.0.js',
  sourceMap: true,
  format: 'iife',
  moduleName: 'ng.data',

  plugins: [
    typescript({
      typescript: ts
    }),
    rollupNG2(),
    nodeResolve({ jsnext: true, main: true })
  ],

  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated'
  ]
};

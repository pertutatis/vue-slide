import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/components/DomestikCarousel.vue',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      chunkFileNames: '[name].[hash].cjs',
      entryFileNames: '[name].cjs'
    }
  ],
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
      style: {
        postcssPlugins: [
          require('postcss-import'),
          require('postcss-custom-properties')({
            preserve: true
          }),
          require('postcss-apply'),
          require('postcss-nested'),
          require('postcss-custom-media')({
            preserve: true
          }),
          require('autoprefixer')
        ]
      }
    }),
    postcss({
      plugins: [
        require('postcss-import'),
          require('postcss-custom-properties')({
            preserve: true
          }),
          require('postcss-apply'),
          require('postcss-nested'),
          require('postcss-custom-media')({
            preserve: true
          }),
          require('autoprefixer')
      ]
    }),
    buble({
      objectAssign: 'Object.assign',
      transforms: {  
        asyncAwait: false,  
      }
    }),
    dynamicImportVars()
    
  ]
}

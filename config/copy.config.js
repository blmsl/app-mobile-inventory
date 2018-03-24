module.exports = {
 copyAssets: {
  src: ['{{SRC}}/assets/**/*'],
  dest: '{{WWW}}/assets'
 },
 copyIndexContent: {
  src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
  dest: '{{WWW}}'
 },
 copyFonts: {
  src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
  dest: '{{WWW}}/assets/fonts'
 },
 copyPolyfills: {
  src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
  dest: '{{BUILD}}'
 },
 copyMaterializeJs: {
  src: ['{{ROOT}}/node_modules/materialize-css/dist/js/materialize.min.js'],
  dest: '{{BUILD}}'
 },
 copyMaterializeCss: {
  src: ['{{ROOT}}/node_modules/materialize-css/dist/css/materialize.min.css'],
  dest: '{{BUILD}}'
 }
}
const path = require('path');

module.exports = {
  GenerateSW: (options) => {
    return options;
  },
  InjectManifest: (options) => {
    options.swSrc = path.resolve(__dirname, 'src/service-worker.js');
    options.maximumFileSizeToCacheInBytes = 100 * 1024 * 1024;
    return options;
  }
};
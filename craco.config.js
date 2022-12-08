const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [{
    plugin: {
      overrideWebpackConfig: ({ webpackConfig, context: { env, paths } }) => {
        if(process.env.REACT_APP_DISABLE_SW !== 'true') {
          try {
            const workboxConfig = require(path.join(
              paths.appPath,
              'workbox.config.js'
            ));

            let foundInjectManifest = false;
            webpackConfig.plugins.forEach((plugin) => {
              console.log(plugin.constructor.name)
              if(plugin.constructor.name === 'InjectManifest') {
                plugin.config = workboxConfig.InjectManifest(plugin.config);
                foundInjectManifest = true;
              }
            });
    
            if(!foundInjectManifest) {
              webpackConfig.plugins.push(new WorkboxWebpackPlugin.InjectManifest(workboxConfig.InjectManifest({
                swSrc: path.resolve(__dirname, 'src/service-worker.js'),
                dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
                exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
              })));
            }
          } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', `[craco-workbox]`);
            console.log('\x1b[31m%s\x1b[0m', error.stack);
            process.exit(1);
          }
        }

        return webpackConfig;
      },
    }
  }]
}
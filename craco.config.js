module.exports = {
  webpack: {
    configure: function (config, { env }) {
      if (env === 'production') {
        //JS Overrides
        config.output.filename = 'static/js/[name].js';
        config.output.chunkFilename = 'static/js/[name].chunk.js';
        config.output.assetModuleFilename = 'static/media/[name].[ext]';

        //CSS Overrides
        config.plugins[5].options.filename = 'static/css/[name].css';
        config.plugins[5].options.chunkFilename = 'static/css/[name].chunk.css';
      }
      return config
    },
  },
};

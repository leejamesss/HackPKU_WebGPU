const { defineConfig } = require('@vue/cli-service');
const ProgressPlugin = require('progress-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new ProgressPlugin(), // 实例化插件
    ],
  },
});

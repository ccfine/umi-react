const path = require("path")

// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '我的公司',
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /services\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
          /utils\//
        ],
      },
      hardSource: true,
    }],
  ],
  alias: {
    components: path.resolve(__dirname, "./src/components"),
    utils: path.resolve(__dirname, "./src/utils")
  },
  history: "hash",
  runtimePublicPath: true,
}

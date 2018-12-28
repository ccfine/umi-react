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
        exclude: [],
      },
      hardSource: true,
    }],
  ],
  alias: {
    component: path.resolve(__dirname, "./src/component"),
    utils: path.resolve(__dirname, "./src/utils")
  }
}

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
module.exports = {
  output: {
    uniqueName: "angularHost",
    publicPath: "auto",
  },
  resolve: {
    alias: {
      // 'keycloak-js': './node_modules/keycloak-js/dist',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      symlinks: false
    }
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        reactRemote: "reactRemote@http://localhost:3000/assets/remoteEntry.js",
        store: "store@http://localhost:3000/assets/remoteEntry.js",
      },
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }, ["keycloak-js"]),
      },
    }),
  ],
};

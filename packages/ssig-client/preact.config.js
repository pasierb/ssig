import envVars from 'preact-cli-plugin-env-vars';


/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function(config, env, helpers) {
  const { devServer } = config;

  config.devServer = Object.assign({}, devServer, {
    https: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/graphql": "http://localhost:3000"
    }
  });

  envVars(config, env, helpers);
}

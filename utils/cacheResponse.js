const { config } = require('../config');

function cacheResponse(res, seconds) {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}
// No todas las rutas deben requerir cache solo en las que piden objectos
module.exports = cacheResponse;

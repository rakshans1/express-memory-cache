/**
 * Module dependencies.
 */
var mcache = require('memory-cache');


/**
 * Expose `cache()` function on requests.
 *
 * @return {Function}
 * @api public
 */
module.exports = function cache(duration) {
  duration = duration || 10;
  
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}
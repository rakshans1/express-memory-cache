# express-memory-cache

Cache middleware for express 
## Install

    $ npm install -save connect-flash

```javascript
var cache = require('express-memory-cache');

app.get('/', cache(10), (req, res) => {
  res.render('index')
})
```
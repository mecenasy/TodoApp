const jsonServer = require('json-server')
const server = jsonServer.create()
const data = require('./db.js')
const router = jsonServer.router(data())
const middlewares = jsonServer.defaults()

// CUSTOM SHIT FOR COMMAND INCREMENT AND DECREMENT
const db = router.db;
const putMiddleware = (req, res, next) => {
   if (req.method == 'PATCH' && req.path.substr(0, 10) == '/counters/') {
      const parts = req.path.split('/');

      const counters = db.get("counters");

      if (parts[3] === 'increment') {
         const counter = counters.getById(parts[2]).value();
         ++counter.count;
         res.locals.data = counter;
      }
      else if (parts[3] === 'decrement') {
         const counter = counters.getById(parts[2]).value();
         --counter.count;
         res.locals.data = counter;
      }
   }
   next();
}
// CUSTOM SHIT

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(putMiddleware)

server.use(router)
server.listen(3000, () => {
   console.log('JSON Server is running')
})

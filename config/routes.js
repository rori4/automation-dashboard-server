const authRoutes = require('../routes/auth')
const bookRoutes = require('../routes/book')
const amazonRoutes = require('../routes/amazon')
const udemyRoutes = require('../routes/udemy')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/books', bookRoutes)
  app.use('/amazon', amazonRoutes)
  app.use('/udemy', udemyRoutes)
}

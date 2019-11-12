const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const loginRouter = require('./route/authRouter');
const appRouter = require('./route/appRouter')
const con = require("./util/database.js")

const port = process.env.SERVER_PORT|| 3000;

// Using hbs template engine
app.engine('hbs',expressHbs ({
      defaultLayout: 'main-layout',
      layoutsDir: 'views/layouts/',
      partialsDir: 'views/partials',
      extname: 'hbs'
    })
  );
app.set('view engine', 'hbs');
app.set('views', 'views');

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

app.use(bodyParser.urlencoded({ extended: false })) // middleware
app.use(bodyParser.json()) // middleware
app.use(loginRouter);
app.use(appRouter)
app.use(express.static(path.join(__dirname,'public')));

app.listen(port, () => console.log('Server ready'))

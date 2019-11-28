const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const loginRouter = require('./route/authRouter');
const appRouter = require('./route/appRouter')
const con = require("./util/database.js")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const io = require("socket.io")(5000);
const port = process.env.SERVER_PORT|| 3000;

io.on("connection", (socket) => {
    socket.on("leave", (conversation) => {
        socket.leave(conversation);
    });

    socket.on("join", (conversation) => {
        socket.join(conversation);
    });

    socket.on("private-message", (data) => {
        socket.broadcast.to(data.room).emit("retrieve-private-message", {
            message: data.message
        });
    });
});



//io.on("connection", socket => {
//    socket.on("send-message", (message) => {
//        socket.broadcast.emit("private-message", message);
//    });
//});

// Using hbs template engine
app.engine('hbs',expressHbs ({
      defaultLayout: 'main-layout',
      layoutsDir: 'views/layouts/',
      partialsDir: ['views/partials/app', 'views/partials/auth'],
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

app.use(cookieParser());
app.use(session(
  {
    secret: 'keyboard cat',
    resave: false, 
    saveUninitialized: false
  }
  ))


app.use(bodyParser.urlencoded({ extended: false })) // middleware
app.use(bodyParser.json()) // middleware
app.use(loginRouter);
app.use(appRouter)
app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log('Server ready'))

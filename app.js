const http = require('http');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

// Create the database connection 
mongoose.connect(config.database);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + config.database);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});


//include routes
const index = require('./routes/index');
const api = require('./routes/api');

const app = express();
app.use(cors())
const server = http.createServer(app);

//Set static folder
app.use(express.static(path.resolve(__dirname, 'public')));

//Templating engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//routes
app.use('/', index);
app.use('/api', api);

//The 404 Route
app.get('*', function(req, res) {
  res.render('index');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  const addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

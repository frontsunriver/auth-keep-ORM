// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors');
var passport = require('passport');
var User = require("./models/user");
 
//Sync Database
User.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});


// DB Setup
// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

app.use(passport.initialize());
app.use(passport.session());

// Allow cross-origin resource sharing
app.use(cors());
app.options('*', cors());

// Application Routes

router(app);
require('./services/passport.js')(passport, User);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

require("dotenv").config({path:`${__dirname}/config/dev.env`});
var bot = require('./bot');
require('./web')(bot);
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
require("dotenv").config();
const moment = require('moment');
const cors = require("cors")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
/* // Development-Cors
   app.use(cors());
 */
// Production-Cors
app.use(cors({
  origin:"https://movementmapper-front.herokuapp.com"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to port'+ PORT ));
});
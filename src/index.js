const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const clientController  = require('./infrastructure/controllers/client.controller');
const courierController = require('./infrastructure/controllers/courier.controller');
const restaurantController = require('./infrastructure/controllers/restaurant.controller');
const orderController = require('./infrastructure/controllers/order.controller');
const configService = require('./infrastructure/services/config.service');

// FOR SIMPLIFY WE NOW DON`T APPLY VALIDATION AND DEPENDENCY INJECTION
// ALSO IN THIS VERSION WE DON`T HAVE ROLE MANAGEMENT, SO ANY CLIENT HAS ADMIN ACCESS RIGHTS

const sequelize = new Sequelize(configService.get('dbConnectionUrl'));
sequelize.authenticate();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/client', clientController);
app.use('/courier', courierController);
app.use('/restaurant', restaurantController);
app.use('/order', orderController);

app.listen(configService.get('port'));

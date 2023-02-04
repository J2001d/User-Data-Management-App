const express = require('express');

const route = express.Router()
// taki servies folder mai rakhi render file se data le paye wo hum yaha bhi likh skte the par accha dikhe isliye wala liklha hai
const services = require('../services/render');

const controller = require('../controller/controller')
// creating default route 
route.get('/',services.homeRoutes);

route.get('/add-user',services.add_user);

route.get('/update-user',services.update_user);


// API

route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);






module.exports = route
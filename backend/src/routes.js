const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashBoardController = require('./controllers/DashBoardController');
const BookingController = require('./controllers/BookingController')



const routes = express.Router();

const upload = multer(uploadConfig);

routes.post('/sessions',SessionController.store);

routes.post('/spot',upload.single('thumbnail'),SpotController.store);

routes.get('/spot',SpotController.index);
 
routes.get('/dashboard',DashBoardController.show);

routes.post('/spot/:spot_id/bookings',BookingController.store);

routes.post('/booking/:booking_id/aprovals',BookingController.aproval)

routes.post('/booking/:booking_id/rejections',BookingController.reject)




module.exports = routes;
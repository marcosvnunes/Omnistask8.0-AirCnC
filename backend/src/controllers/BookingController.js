const Booking = require('../models/Booking')

module.exports = {
    async store(req,res){
        const { user_id} = req.headers;
        const { spot_id} = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user:user_id,
            spot:spot_id,
            date,
        })

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user]

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request',booking)

        }
        
        return res.json(booking);
    },
    async aproval(req,res){
        const { booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.Approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response',booking)

        }

        return res.json(booking);
    },
    async reject(req,res){
        const { booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.Approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response',booking)

        }

        return res.json(booking);
    }
}
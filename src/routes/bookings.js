import express from 'express';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createBooking.js';
import NotFoundErrorHandler from '../middleware/NotFoundErrorHandler.js';
import authMiddleware from '../middleware/auth.js';
import updateBooking from '../services/bookings/updateBooking.js';
import deleteBooking from '../services/bookings/deleteBooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import { validateId } from '../utils/validate.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const bookings = await getBookings(req.query);
        res.status(200).json(bookings);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({id, message: `Booking ID is required` })
        const booking = await getBookingById({ id });
        return res.status(200).json(booking)
     } catch (error) {
        next(error)
    }
})

router.post('/', authMiddleware,async (req, res, next) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const booking = await createBooking({ userId, propertyId, checkinDate: new Date(checkinDate), checkoutDate: new Date(checkoutDate), numberOfGuests, totalPrice, bookingStatus });
        return res.status(201).json(booking);
    } catch (error) {
        next(error)
    }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        validateId({ id, message: `Booking ID is required` });
        const updatedBooking = await updateBooking({ id, ...req.body });
        return res.status(200).json(updatedBooking);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Booking ID is required` });
        const deletedBooking = await deleteBooking({ id });
        return res.status(200).json({ message: `Booking with id ${deletedBooking} was deleted` })
     } catch (error) {
        next(error)
    }
})

router.all('*', (req, res) => {
    res.status(405).json({
        message: `Method ${req.method} not allowed on ${req.originalUrl}`,
    })
})

router.use(NotFoundErrorHandler)
export default router;
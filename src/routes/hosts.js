import express from 'express';
import getHosts from '../services/hosts/getHosts.js';
import NotFoundErrorHandler from '../middleware/NotFoundErrorHandler.js';
import createHost from '../services/hosts/createHost.js';
import authMiddleware from '../middleware/auth.js';
import updateHost from '../services/hosts/updateHost.js';
import deleteHost from '../services/hosts/deleteHost.js';
import getHostById from '../services/hosts/getHostById.js';
import { validateId } from '../utils/validate.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try { 
        const reviews = await getHosts(req.query);
        res.status(200).json(reviews);
     } catch (error) { 
        next(error)
     }
})

router.get('/:id', async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({id, message: `Booking ID is required`})
        const host = await getHostById({ id });
        return res.status(200).json(host);
     } catch (error) { 
        next(error)
     }
})

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const host = await createHost({ ...req.body });
        return res.status(201).json(host)
    } catch (error) {
        next(error)
    }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Booking ID is required` });
        const updatedHost = await updateHost({ id, ...req.body });
        return res.status(200).json(updatedHost)
     } catch (error) {
        next(error);
    }
})

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Booking ID is required` });
        const deletedHost = await deleteHost({ id });
        res.status(200).json({ message: `Host with id ${deletedHost.id} was deleted`});
     } catch (error) {
        next(error)
    }
})

router.use(NotFoundErrorHandler);

export default router;


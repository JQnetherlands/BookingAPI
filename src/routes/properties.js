import express from 'express';
import getProperties from '../services/properties/getProperties.js';
import NotFoundErrorHandler from '../middleware/NotFoundErrorHandler.js';
import authMiddleware from '../middleware/auth.js';
import createProperty from '../services/properties/createProperty.js';
import updateProperty from '../services/properties/updateProperty.js';
import deleteProperty from '../services/properties/deleteProperty.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import { validateId } from '../utils/validate.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const properties = await getProperties(req.query);
        res.status(200).json(properties);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Property ID is required` });
        const property = await getPropertyById({ id });
        return res.status(200).json(property);
     } catch (error) {
        next(error)
    }
})

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const property = await createProperty({ ...req.body });
        res.status(201).json(property)
    } catch (error) {
        next(error)
    }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Property ID is required` });
        const updatedProperty = await updateProperty({ id, ...req.body });
        return res.status(200).json(updatedProperty)
     } catch (error) {
        next(error);
    }
})

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try { 
        const { id } = req.params;
        validateId({ id, message: `Property ID is required` });
        const deletedProperty = await deleteProperty({ id });
        return res.status(200).json({ message: `Property with id ${deletedProperty} was deleted` })
     } catch (error) {
        next(error)
    }
})

router.use(NotFoundErrorHandler);

export default router;
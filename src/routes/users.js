import express from "express";
import getUsers from "../services/users/getUsers.js";
import NotFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";
import createUser from "../services/users/createUser.js";
import authMiddleware from "../middleware/auth.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";
import getUserById from "../services/users/getUserById.js";
import { validateId } from "../utils/validate.js";


const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const users = await getUsers(req.query);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get("/:id", async (req, res, next) => { 
  try {
    const { id } = req.params;
    validateId({ id, message: `Property ID is required` });
    const user = await getUserById({ id });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
    }
 })

router.post("/", authMiddleware, async (req, res, next) => {
  try { 
    const user = await createUser(req.body);
    return res.status(201).json(user)
   } catch (error) {
    next(error)
  }
})

router.put("/:id", authMiddleware, async (req, res, next) => {
  try { 
    const { id } = req.params;
    validateId({ id, message: `Property ID is required` });
    const updatedUser = await updateUser({ id, ...req.body});
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    validateId({ id, message: `Property ID is required` });
    const deletedUser = await deleteUser({ id });
    return res.status(200).json({ message: `User with id ${deletedUser} was deleted` });
   } catch (error) {
    next(error)
  }
})

router.use(NotFoundErrorHandler);
export default router;

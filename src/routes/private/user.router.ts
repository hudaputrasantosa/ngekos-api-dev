import { Router } from 'express';
import { verifyUser } from '../../utils/jwt';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controllers/user.controller';

const userRouter = Router();

const v1Router = Router();

// v1Router.get('/checkauth', verifyToken, (req, res) => {
//   res.status(200).send('Welcome to page');
// });
// v1Router.get('/checkuser/:id', verifyUser, (req, res) => {
//   res.status(200).send('Hello user!, Welcome and you are logged in!');
// });
// v1Router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//   res.status(200).send('Hello admin!, Welcome and you are logged in!');
// });

v1Router.put('/:id', updateUserById);
v1Router.delete('/:id', deleteUserById);
v1Router.get('/:id', getUserById);
v1Router.get('/', getAllUsers);

userRouter.use('/api', verifyUser, v1Router);

export default userRouter;

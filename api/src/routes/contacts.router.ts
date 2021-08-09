import express from 'express';
import { contactsController } from '../controllers';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.findAll);
contactsRouter.get('/:id', contactsController.find);

export default contactsRouter;

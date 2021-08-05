import express from 'express';
import { contactsController } from '../controllers';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.findAll);

export default contactsRouter;

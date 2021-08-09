import express from 'express';
import { body } from 'express-validator';
import { contactValidator } from 'validators';
import { contactsController } from '../controllers';
import validate from './helpers/validator';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.findAll);
contactsRouter.get('/:id', contactsController.find);
contactsRouter.post('/', validate(contactValidator.createContact(body)), contactsController.create);

export default contactsRouter;

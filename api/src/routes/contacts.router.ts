import express from 'express';
import { body, param } from 'express-validator';
import { contactValidator } from 'validators';
import { contactsController } from '../controllers';
import validate from './helpers/validator';

const contactsRouter = express.Router();

contactsRouter.delete('/:id', validate(contactValidator.removeContact(param)), contactsController.remove);
contactsRouter.get('/', contactsController.findAll);
contactsRouter.get('/:id', validate(contactValidator.getContact(param)), contactsController.find);
contactsRouter.post('/', validate(contactValidator.createContact(body)), contactsController.create);
contactsRouter.put('/:id', validate(contactValidator.updateContact(body, param)), contactsController.update);

export default contactsRouter;

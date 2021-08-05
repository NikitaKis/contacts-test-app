import { contactsModel } from 'models';
import { Contact } from 'types/contact.types';

const findAll = async (): Promise<Contact[]> => contactsModel.findAll();

export { findAll };

import { contactsModel } from 'models';
import { Contact, ContactId } from 'types/contact.types';

const findAll = async (): Promise<Contact[]> => contactsModel.findAll();

const findById = async (id: ContactId): Promise<Contact | undefined> => {
  return contactsModel.find(id);
};

export { findAll, findById };

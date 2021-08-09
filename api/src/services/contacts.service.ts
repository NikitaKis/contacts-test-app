import { contactsModel } from 'models';
import { BaseContact, Contact, ContactId } from 'types/contact.types';

const create = async (contact: BaseContact): Promise<Contact> => contactsModel.create(contact);
const findAll = async (): Promise<Contact[]> => contactsModel.findAll();

const findById = async (id: ContactId): Promise<Contact | undefined> => {
  return contactsModel.find(id);
};

export { create, findAll, findById };

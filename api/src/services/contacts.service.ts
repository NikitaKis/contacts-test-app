import { contactsModel } from 'models';
import { BaseContact, Contact, ContactId } from 'types/contact.types';

const create = async (contact: BaseContact): Promise<Contact> => contactsModel.create(contact);
const findAll = async (): Promise<Contact[]> => contactsModel.findAll();

const findById = async (id: ContactId): Promise<Contact | undefined> => {
  return contactsModel.find(id);
};

const removeById = async (id: ContactId): Promise<boolean> => {
  return contactsModel.remove(id);
};

const update = async (id: ContactId, contact: Contact): Promise<Contact> => {
  return contactsModel.update(id, contact);
};

export { create, findAll, findById, removeById, update };

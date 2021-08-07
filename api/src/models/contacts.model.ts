import { BaseContact, Contact } from 'types/contact.types';
import contacts from './fakeDB';

const findIndexById = (id: number): number => contacts.findIndex((item) => item.id === id);

const create = async (newContact: BaseContact): Promise<Contact> => {
  const newId = contacts.length;
  const contact = {
    id: newId,
    ...newContact,
  };
  contacts.push(contact);
  return contact;
};

const find = async (id: number): Promise<Contact | undefined> => contacts.find((item: Contact) => item.id === id);

const findAll = async (): Promise<Contact[]> => contacts;

const remove = async (id: number): Promise<boolean> => {
  const removeIndex = findIndexById(id);
  if (removeIndex < 0) {
    throw new Error(`Contact with id #${id} not found.`);
  }
  contacts.splice(removeIndex, 1);
  return true;
};

const update = async (id: number, contactUpdate: Contact): Promise<Contact> => {
  const updateIndex = findIndexById(id);
  if (updateIndex < 0) {
    throw new Error(`Contact with id #${id} not found.`);
  }
  contacts[updateIndex] = contactUpdate;
  return contacts[updateIndex];
};

export { create, find, findAll, remove, update };

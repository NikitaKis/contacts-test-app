import { BaseContact, Contact, ContactId } from 'types/contact.types';
import { FindAllContactsResponse } from 'types/response.types';
import contacts from './fakeDB';

const findIndexById = (id: ContactId): number => contacts.findIndex((item) => item.id === id);

const create = async (newContact: BaseContact): Promise<Contact> => {
  const newId = contacts.length;
  const contact = {
    id: newId,
    ...newContact,
  };
  contacts.push(contact);
  return contact;
};

const find = async (id: ContactId): Promise<Contact | undefined> => contacts.find((item: Contact) => item.id === id);

const findAll = async (page: number, pageSize: number): Promise<FindAllContactsResponse> => {
  const total = contacts.length;
  const lastItemIndex = total - 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(lastItemIndex, startIndex + pageSize);
  const data = startIndex <= lastItemIndex ? contacts.slice(startIndex, endIndex) : [];
  const hasMore = startIndex <= lastItemIndex && endIndex <= lastItemIndex;
  return { data, total, hasMore };
};

const remove = async (id: ContactId): Promise<boolean> => {
  const removeIndex = findIndexById(id);
  if (removeIndex < 0) {
    throw new Error(`Contact with id #${id} not found.`);
  }
  contacts.splice(removeIndex, 1);
  return true;
};

const update = async (id: ContactId, contactUpdate: Contact): Promise<Contact> => {
  const updateIndex = findIndexById(id);
  if (updateIndex < 0) {
    throw new Error(`Contact with id #${id} not found.`);
  }
  contacts[updateIndex] = {
    ...contactUpdate,
    id,
  };
  return contacts[updateIndex];
};

export { create, find, findAll, remove, update };

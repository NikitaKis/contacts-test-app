import { BaseContact, Contact, ContactId } from 'types/contact.types';
import { FindAllContactsResponse } from 'types/response.types';
import contacts from './fakeDB';

const findIndexById = (id: ContactId): number => contacts.findIndex((item) => item.id === id);

const create = async (newContact: BaseContact): Promise<Contact> => {
  const newId = Math.max(...contacts.map((item) => item.id)) + 1;
  const contact = {
    id: newId,
    ...newContact,
  };
  contacts.push(contact);
  return contact;
};

const find = async (id: ContactId): Promise<Contact | undefined> => contacts.find((item: Contact) => item.id === id);

const findAll = async (page: number, pageSize: number): Promise<FindAllContactsResponse> => {
  const totalItems = contacts.length;
  const lastItemIndex = totalItems - 1;
  const startIndex = page * pageSize;
  const endIndex = Math.min(lastItemIndex + 1, startIndex + pageSize);
  const data = startIndex <= lastItemIndex ? contacts.slice(startIndex, endIndex) : [];
  const hasMore = startIndex < lastItemIndex && endIndex < lastItemIndex;
  const totalPages = Math.ceil(contacts.length / pageSize);
  return { data, totalItems, hasMore, totalPages };
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

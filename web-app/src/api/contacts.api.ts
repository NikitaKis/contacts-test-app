import { Contact, ContactId } from '../types/data';
import { unAuthRequest } from './utils/request';

const getContacts = (page: number = 0, pageSize: number = 10) => {
  return unAuthRequest({
    method: 'GET',
    url: `/contacts?page=${page}&pageSize=${pageSize}`,
  });
};

const updateContact = (contactId: ContactId, contact: Contact) => {
  return unAuthRequest({
    method: 'PUT',
    url: `/contacts/${contactId}`,
    data: contact,
  });
};

const removeContact = (contactId: ContactId) => {
  return unAuthRequest({
    method: 'DELETE',
    url: `/contacts/${contactId}`,
  });
};

export { getContacts, removeContact, updateContact };

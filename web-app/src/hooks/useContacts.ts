import { useQuery } from 'react-query';
import { contacts as api } from '../api';
import constants from '../constants';
import { Contact, ContactId, DataQueryKey, FindAllContactsResponse } from '../types/data';
import { queryClient } from '../App';
const transformData = (data: FindAllContactsResponse): FindAllContactsResponse => data;

export const queryParams = (page: number, pageSize: number) => {
  return {
    queryKey: [DataQueryKey.Contacts, page],
    queryFn: async () => {
      const data = await api.getContacts(page, pageSize);
      return transformData(data.data.data);
    },
    staleTime: constants.CACHE_TIME_MSEC,
  };
};

const removeContact = async (contactId: ContactId) => {
  await api.removeContact(contactId);
  queryClient.invalidateQueries();
};

const updateContact = async (contact: Contact) => {
  await api.updateContact(contact.id, contact);
  queryClient.invalidateQueries();
};

const useContacts = (page: number, pageSize: number) => {
  return {
    ...useQuery(queryParams(page, pageSize)),
    removeContact,
    updateContact,
  };
};

export default useContacts;

import { useQuery } from 'react-query';
import { contacts as api } from '../api';
import constants from '../constants';
import { DataQueryKey, Contact } from '../types/data';

const transformData = (contacts: Contact[]): Contact[] => contacts;

export const queryParams = () => {
  return {
    queryKey: DataQueryKey.Contacts,
    queryFn: async () => {
      const data = await api.getContacts();
      return transformData(data.data);
    },
    staleTime: constants.CACHE_TIME_MSEC,
  };
};

const useContacts = () => {
  return useQuery(queryParams());
};

export default useContacts;

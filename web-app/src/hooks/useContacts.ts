import { useQuery } from 'react-query';
import { contacts as api } from 'api';
import { DataQueryKey } from 'types';
import constants from '../constants';
import { Contact } from '../types/data';

const transformData = (contacts: Contact[]): TransformedAdvisories => contacts;

export const advisoriesQueryParams = () => {
  return {
    queryKey: DataQueryKey.Advisories,
    queryFn: async () => {
      const data = await api.getAdvisories();
      return transformData(data.data);
    },
    staleTime: constants.CACHE_TIME_MSEC,
  };
};

const useAdvisories = () => {
  return useQuery(advisoriesQueryParams());
};

export default useAdvisories;

import { unAuthRequest } from './utils/request';

const getContacts = () => {
  return unAuthRequest({
    method: 'GET',
    url: '/contacts',
  });
};

export { getContacts };

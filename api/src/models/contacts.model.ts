import { Contact } from 'types/contact.types';

const contacts: Contact[] = [
  {
    id: 1,
    name: 'test contact',
    address: {
      streetName: 'test street name',
      houseNumber: 1,
      stateProvince: 'NS',
      city: 'Halifax',
    },
    phoneNumber: '888-880-88-88',
    email: 'test@test.com',
  },
];
const findAll = async (): Promise<Contact[]> => contacts;

export { findAll };

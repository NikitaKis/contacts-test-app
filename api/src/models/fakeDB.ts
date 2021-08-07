import { Contact } from 'types/contact.types';
import { address, name, phone, internet } from 'faker';

const contacts: Contact[] = [];
const CONTACTS_SIZE = 100;

const fakeContact = (id: number): Contact => ({
  id,
  name: name.findName(),
  address: {
    streetName: address.streetName(),
    houseNumber: Math.floor(Math.random() * 1000) + 1,
    city: address.cityName(),
    stateProvince: address.state(),
  },
  phoneNumber: phone.phoneNumberFormat(),
  email: internet.email(),
});

export const fillDBWithFakeData = () => {
  for (let index = 1; index <= CONTACTS_SIZE; index++) {
    contacts.push(fakeContact(index));
  }
};

export default contacts;

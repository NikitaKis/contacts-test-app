import { addressTypes } from '.';

interface BaseContact {
  name: string;
  address: addressTypes.Address;
  phoneNumber: string;
  email: string;
}

type ContactId = number;
interface Contact extends BaseContact {
  id: ContactId;
}

export { BaseContact, Contact, ContactId };

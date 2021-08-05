import { addressTypes } from '.';

interface BaseContact {
  name: string;
  address: addressTypes.Address;
  phoneNumber: string;
  email: string;
}

interface Contact extends BaseContact {
  id: number;
}

export { BaseContact, Contact };

export enum DataQueryKey {
  Contacts = 'Contacts',
}

export type ContactId = number;

export interface Address {
  streetName: string;
  houseNumber: number;
  city: string;
  stateProvince: string;
}
export interface Contact {
  id: ContactId;
  name: string;
  address: Address;
  phoneNumber: string;
  email: string;
}

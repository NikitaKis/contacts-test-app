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
export interface BaseContact {
  name: string;
  address: Address;
  phoneNumber: string;
  email: string;
}

export interface Contact extends BaseContact {
  id: ContactId;
}

export interface FindAllContactsResponse {
  data: Contact[] | [];
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

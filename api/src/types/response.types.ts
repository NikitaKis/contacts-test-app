import { Contact } from './contact.types';

interface FindAllContactsResponse {
  data: Contact[] | [];
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

type ResponseData = Contact | Contact[] | string | FindAllContactsResponse;

type SuccessResponse = {
  success: boolean;
  data: ResponseData;
  errors: [];
};
export { FindAllContactsResponse, ResponseData, SuccessResponse };

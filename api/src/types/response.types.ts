import { Contact } from './contact.types';

type ResponseData = Contact | Contact[];

type SuccessResponse = {
  success: boolean;
  data: ResponseData;
  errors: [];
};
export { ResponseData, SuccessResponse };

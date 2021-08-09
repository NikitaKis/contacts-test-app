import { ResponseData, SuccessResponse } from 'types/response.types';

const formatSuccessResponse = (data?: ResponseData): SuccessResponse => {
  return {
    success: true,
    data: data || '',
    errors: [],
  };
};

export { formatSuccessResponse };

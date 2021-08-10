//@ts-ignore
const checkContact = (body) => [
  body('email').isEmail(),
  body('name').isString().isLength({ min: 5 }).withMessage('Name must have more than 5 characters'),
  body('name').notEmpty().withMessage('Name is a required parameter'),
  body('phoneNumber').notEmpty(),
  body('address.streetName').notEmpty(),
  body('address.houseNumber').notEmpty(),
  body('address.city').notEmpty(),
  body('address.stateProvince').notEmpty(),
];
//@ts-ignore
const checkIdInParam = (param) => [param('id').isInt().withMessage('Missing id in params.')];
//@ts-ignore
export const getContact = (param) => checkIdInParam(param);
//@ts-ignore
export const createContact = (body) => checkContact(body);
//@ts-ignore
export const removeContact = (param) => checkIdInParam(param);
//@ts-ignore
export const updateContact = (body, param) => {
  return [...checkContact(body), ...checkIdInParam(param)];
};

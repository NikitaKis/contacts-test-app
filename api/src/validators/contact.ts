export const createContact = (body) => {
  return [
    body('email').isEmail(),
    body('name').isString(),
    body('name').notEmpty(),
    body('phoneNumber').notEmpty(),
    body('address.streetName').notEmpty(),
    body('address.houseNumber').notEmpty(),
    body('address.city').notEmpty(),
    body('address.stateProvince').notEmpty(),
  ];
};

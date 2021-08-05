import { Request, Response } from 'express';

import { Contact } from 'types/contact.types';
import { contactsService } from 'services';

const findAll = async (req: Request, res: Response) => {
  try {
    const contacts: Contact[] = await contactsService.findAll();
    res.status(200).send(contacts);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export { findAll };

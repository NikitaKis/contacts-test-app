import { NextFunction, Request, Response } from 'express';

import { BaseContact, Contact } from 'types/contact.types';
import { contactsService } from 'services';
import { formatSuccessResponse } from './helpers';
import catchAsync from 'utils/catchAsync';
import AppError from 'utils/appError';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const contact: BaseContact = req.body;
  const newContact: Contact | undefined = await contactsService.create(contact);
  if (!newContact) return next(new AppError(`Contact create failed`, 400));
  res.status(201).send(formatSuccessResponse(newContact));
});

const find = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id || isNaN(id)) return next(new AppError(`Missing id in params!`, 400));
  const contact: Contact | undefined = await contactsService.findById(id);
  if (!contact) return next(new AppError(`Contact with id#${id} not found`, 404));
  res.status(200).send(formatSuccessResponse(contact));
});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const contacts: Contact[] = await contactsService.findAll();
  if (!contacts) new AppError('Contacts not found', 404);
  res.status(200).send(formatSuccessResponse(contacts));
});

export { create, find, findAll };

import { NextFunction, Request, Response } from 'express';

import { BaseContact, Contact } from 'types/contact.types';
import * as contactsService from 'services/contacts.service';
import { formatSuccessResponse } from './helpers';
import catchAsync from 'utils/catchAsync';
import AppError from 'utils/appError';
import { FindAllContactsResponse } from 'types/response.types';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const contact: BaseContact = req.body;
  const newContact: Contact | undefined = await contactsService.create(contact);
  if (!newContact) return next(new AppError(`Failed to create contact`, 400));
  res.status(201).send(formatSuccessResponse(newContact));
});

const find = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  const contact: Contact | undefined = await contactsService.findById(id);
  if (!contact) return next(new AppError(`Contact with id#${id} not found`, 404));
  res.status(200).send(formatSuccessResponse(contact));
});

const findAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const page = +`${req?.query?.page}` || 0;
  const pageSize = +`${req?.query?.pageSize}` || 10;
  const result: FindAllContactsResponse = await contactsService.findAll(page, pageSize);
  if (!result) return next(new AppError('Contacts not found', 404));
  res.status(200).send(formatSuccessResponse(result));
});

const remove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  const result = await contactsService.removeById(id);
  if (!result) return next(new AppError('Failed to remove contact', 400));
  res.status(200).send(formatSuccessResponse());
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id, 10);
  const contact: Contact = req.body;
  const updatedContact = await contactsService.update(id, contact);
  if (!updatedContact) return next(new AppError('Failed to update contact', 400));
  res.status(201).send(formatSuccessResponse(updatedContact));
});

export { create, find, findAll, remove, update };

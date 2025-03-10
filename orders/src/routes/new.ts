import mongoose from 'mongoose'; //optional
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@datn242/common';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) //optional mongoID check
      .withMessage('TicketId is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  },
);

export { router as newOrderRouter };

import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@datn242/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderID',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderID).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  },
);

export { router as showOrderRouter };

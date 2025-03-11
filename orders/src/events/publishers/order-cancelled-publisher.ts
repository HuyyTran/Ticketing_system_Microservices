import { Publisher, OrderCancelledEvent, Subjects } from '@datn242/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

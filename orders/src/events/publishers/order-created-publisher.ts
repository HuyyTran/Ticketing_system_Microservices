import { Publisher, OrderCreatedEvent, Subjects } from '@datn242/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

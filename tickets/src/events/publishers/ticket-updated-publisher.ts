import { Publisher, Subjects, TicketUpdatedEvent } from '@datn242/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

import { Message } from 'node-nats-streaming';
import { Listener, TicketCreatedEvent, Subjects } from '@datn242/common';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {}
}

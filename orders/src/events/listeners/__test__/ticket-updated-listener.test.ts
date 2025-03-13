import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Listener, TicketUpdatedEvent } from '@datn242/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create and save a ticket
  const ticket = new Ticket({
    title: 'concert',
    price: 100,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: 'new concert',
    price: 999,
    userId: 'ablskdjf',
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  // return all of this stuff
  return { msg, data, ticket, listener };
};

it('find, update and save a ticket', async () => {
  const { msg, data, ticket, listener } = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, ticket, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});

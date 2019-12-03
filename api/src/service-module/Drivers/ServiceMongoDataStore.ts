import { MongoDriver } from "../../drivers";
import { Ticket } from "../../shared/entity/ticket";
import {ObjectId} from 'mongodb';
export class ServiceMongoDataStore {
  ticketStore: any;
  constructor() {
    MongoDriver.buildDriver(process.env.DB_URI as string, "service-requests").then(
      store => {
        this.ticketStore = store;
      }
    );
  }

  async fetchUserServiceRequests({ id }: { id: string }) {
    const tickets = await this.ticketStore.find({ requesterId: id }).toArray();
    return tickets;
  }

//TODO: optimize this function to return the count with the tickets in one go.
  async fetchAllTickets(){
    const tickets = await this.ticketStore.find().toArray();
    return tickets;

  }

  async documentTicket(info:Ticket){
    await this.ticketStore.insert(info);
  }

  async updateTicket(update: {requestId:any, response: string}){
    console.log(update.response);
    await this.ticketStore.update({_id: new ObjectId(update.requestId)},{ $set: {status: update.response}})
  }
}

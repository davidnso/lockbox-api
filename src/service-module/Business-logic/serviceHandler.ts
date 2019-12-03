import { ServiceMongoDataStore } from "../Drivers/ServiceMongoDataStore";
import { ticketInfo } from "../../shared/entity";
import { Ticket } from "../../shared/entity/ticket";

export type TicketResponse = {
  status: string;
};

const dataStore = new ServiceMongoDataStore();
export async function findUserServiceRequests({
  requester
}: {
  requester: string;
}) {
  try {
    const userTickets = await dataStore.fetchUserServiceRequests({
      id: requester
    });
    return userTickets;
  } catch (err) {
    throw new Error("Driver level error...");
  }
}

//validate requester...
export async function updateSR({
  requestId,
  response
}: {
  requestId: string;
  response: string;
}) {
  /**
   * update the ticket with a response and set the status to accepted/denied.
   */
try {
  console.log('here')
  await dataStore.updateTicket({requestId,response})
} catch (error) {
  console.log(error);
}
  
}

export async function createNewTicket(info:ticketInfo){
  if(info.buildingId){
    try{
      const userServiceTicket = new Ticket(info);
      await dataStore.documentTicket(userServiceTicket);
    }catch(err){
      console.log(err);
    }
  }
}

export async function fetchAllServiceRequests() {
  const tickets = await dataStore.fetchAllTickets();
  return tickets;
}

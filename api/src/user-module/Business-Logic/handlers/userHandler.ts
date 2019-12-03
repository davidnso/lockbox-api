import { UserMongoDataStore } from "../../drivers/userMongoDataStore";
import { User } from "../../../shared/entity";
import {
  studentUser,
  privilegedUser,
  FullStudentUser,
  StudentUser
} from "../../../shared/entity/user";
import * as jwt from 'jsonwebtoken';
const dataStore = new UserMongoDataStore();

const STUDENT = "student";
const ADMIN = "admin";
const PRIVILEGED_USER = "privileged";

export async function fetchUsers({role}:{role?:string}) {
  try {
    //validate requester
    return await dataStore.fetchAllUsers(role);
  } catch (err) {
    console.log(err);
  }
}

export async function createUserAccount(params: {
  user: User;
  accountType: string;
}) {
  const { user, accountType } = params;
  let newUser: any;
  try {
    /**
     * TODO: x10000 check is certain fields provided are already populated
     * reject used
     * username
     * email
     * */
    if (accountType === STUDENT) {
      newUser = new studentUser(user);
    } else if (accountType === ADMIN || accountType === PRIVILEGED_USER) {
      newUser = new privilegedUser(user);
    }
    await dataStore.addUser(newUser);
  } catch (err) {
    throw err;
  }
}

export async function findUser(params: { id: string }) {
  const { id } = params;
  try {
    let user: studentUser[];
    user = await dataStore.fetchUser(id);
    if(user[0].guests){
      user[0].guests = user[0].guests.map(mapGuestsToProperContract);
    }
    
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function login(params: { loginRequest: any }) {
  const { loginRequest } = params;
  try {
    if (loginRequest) {
      const user = await dataStore.matchUserCredentials(loginRequest);
     
      if (user || user.length) {

        const bearer= user.length>0? jwt.sign({user},'secretKey',{expiresIn: 86400}): null;
        return {user,bearer}
      }
      else{
        return 'No user found'
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export async function findGuests({ id }: { id: string }) {
  try {
    const guests = await dataStore.fetchGuestsByHostId(id);
    return guests;
  } catch (err) {
    console.log("Driver error: ", err);
  }
}

export async function deleteGuestByName({name, id}:{name:string,id: any}){
  try{
    await dataStore.deleteGuestByName({id,name});
  }catch(err){
    console.log('Driver error: ', err);
  }
}

 async function fetchRoommatesByStudentId(params: { roommateIds: string[] }) {
  const { roommateIds } = params;
  try {
    let roommates: studentUser[];
    console.log("Fetching roommates", roommateIds);

    if (roommateIds) {
      return await dataStore.fetchRoommates(roommateIds);
    }
    return roommates!;
  } catch (err) {
    throw err;
  }
}

export async function loadStudentRoommates(params: { id: string }) {
  const { id } = params;
  let roommates: studentUser[];
  //check if user exists and is found
  const user: Partial<studentUser>[] = await dataStore.fetchUser(id);
  console.log(user);

  if (user) {
    roommates = await fetchRoommatesByStudentId({
      roommateIds: user[0].roommates as string[]
    });

    console.log("Actual roommate", roommates);
    return roommates;
    //TODO: add roommate to the FullStudentUser and return.
  } else {
    throw new Error("User was not found!");
  }
}

export async function updateUserStatus({userUpdates, id}:{
  userUpdates: any, id: string
}){
  await dataStore.updateUserStatus({id,userUpdates});
}

function mapGuestsToProperContract(guest: any){
     return {
       name: guest.name,
       end: guest.end,
       percentage: calculatePercentage(guest.end),
     }
}

function calculatePercentage(end: string){
  if((Number.parseInt(end) - Date.now() < 0)){
        console.log('less than 0 ')
        return 0;
      }else{
       console.log('greater than 0')
       return ((((Number.parseInt(end) - Date.now())/86400000) * 100)).toFixed(2);
      }
}
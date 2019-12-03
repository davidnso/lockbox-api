import { buildingDocument } from "./building";
import { UserDocument } from "./user";
export interface accessLogDocument {
  _id: string;
  buildingId: string;
  userId: string;
  date: string;
  granted: boolean;
}

export interface accessLog {
  building: Partial<buildingDocument>;
  user: Partial<UserDocument>;
  granted: boolean;
}

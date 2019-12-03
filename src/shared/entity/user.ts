export interface UserDocument {
  _id: string;
  name: string;
  role: string;
  accessRights: string[];
  roommates: string[]; //change to user object when being fetched. deal with this later.
}

export interface StudentUser {
  name: string;
  role: string;
  status: string;
  roommates: string[]; //change to user object when being fetched. deal with this later.
}

export interface FullStudentUser {
  name: string;
  role: string;
  status: string;
  roommates: studentUser[];
}

export interface PrivelagedUser {
  name: string;
  univId: string;
  role: string;
  roommates: string[];
  accessRights: string[];
}

export interface loginRequest {
  username: string;
  password: string;
}
export class User {
  _id: string | undefined;
  name!: string;
  username!: string;
  email!: string;
  role!: string;
  password!: string;
  constructor(object: Partial<User>) {
    this._id = undefined;
    this.name = object.name as string;
    this.email = object.email as string;
    this.role = object.role as string;
    this.username = object.username as string;
    this.password = object.password as string;
  }
  //TODO: implement password hashing and validate tokens.
  hashPassword(password: string) {}
}

export class privilegedUser extends User {
  accessRights!: string[];
  constructor(object: Partial<privilegedUser>) {
    object.role = "privileged";
    super(object);
    this.accessRights = object.accessRights as string[];
  }
}

export class studentUser extends User {
  roommates!: string[];
  status!: string;
  guests!: any[]
  constructor(object: Partial<studentUser>) {
    object.role = "student";
    object.status = "no status";
    super(object);
    this.roommates = object.roommates as string[];
    this.guests = object.guests as any[];
  }
}

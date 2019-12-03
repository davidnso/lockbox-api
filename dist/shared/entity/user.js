"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(object) {
        this._id = undefined;
        this.name = object.name;
        this.email = object.email;
        this.role = object.role;
        this.username = object.username;
        this.password = object.password;
    }
    //TODO: implement password hashing and validate tokens.
    hashPassword(password) { }
}
exports.User = User;
class privilegedUser extends User {
    constructor(object) {
        object.role = "privileged";
        super(object);
        this.accessRights = object.accessRights;
    }
}
exports.privilegedUser = privilegedUser;
class studentUser extends User {
    constructor(object) {
        object.role = "student";
        object.status = "no status";
        super(object);
        this.roommates = object.roommates;
        this.guests = object.guests;
    }
}
exports.studentUser = studentUser;

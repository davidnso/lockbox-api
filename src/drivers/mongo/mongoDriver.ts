import * as mongodb from "mongodb";
import { Db } from "mongodb";
import { User } from "../../shared/entity/user";
require("dotenv").config();

export class MongoDriver {
  static db: any;

  public static async buildDriver(uri: string, collection: string) {
    const mongoUri = uri.replace(/<password>/g, process.env
      .DB_PASSWORD as string);
    console.log(mongoUri);
    const client = new mongodb.MongoClient(mongoUri, { useNewUrlParser: true });
    try {
      await client.connect();
      console.log("connected");
      return client.db("safe").collection(collection);
    } catch (err) {
      console.log("Error on connect: " + err);
    }
  }
}

import { MongoDriver } from "../../drivers";
import { throws } from "assert";
import { ObjectId } from "mongodb";

export class BuildingMongoDataStore {
  buildingStore: any;
  constructor() {
    MongoDriver.buildDriver(process.env.DB_URI as string, "buildings").then(
      store => {
        this.buildingStore = store;
      }
    );
  }

  async findAllBuildings() {
    return await this.buildingStore.find({}).toArray();
  }

  async findBuildingsByLUID({ id }: { id: string }) {
    try {
      console.log('here');
      const buildings = await this.buildingStore
        .find({ _id: new ObjectId(id) })
        .toArray();
      return buildings? buildings: 'not found';
    } catch (err) {
      console.log("Mongo Error: ", err);
    }
  }

  async fetchLogsbyBuildingId({ luid }: { luid: string }) {
    try {
      const objectId = new ObjectId(luid);
      const accessLogs = await this.buildingStore
        .aggregate([
          {
            $match: {
              _id: objectId
            }
          },
          {
            $lookup: {
              from: "access-logs",
              localField: "_id",
              foreignField: "buildingId",
              as: "accessLogs"
            }
          },
          {
            $unwind: {
              path: "$accessLogs",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $replaceRoot: {
              newRoot: "$accessLogs"
            }
          }
        ])
        .toArray();
      return accessLogs;
    } catch (err) {
      console.log("Mongo Error: ", err);
    }
  }
}

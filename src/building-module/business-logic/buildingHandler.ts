import { BuildingMongoDataStore } from "../drivers/BuildingMongoDataStore";

const dataStore = new BuildingMongoDataStore();
/**
 * pass in the requester and verify that the user is the an admin.
 */
export async function fetchAllBuildings() {
  try {
    return await dataStore.findAllBuildings();
  } catch (err) {
    console.log("Driver Error: ", err);
  }
}

export async function fetchBuildingById({ id }: { id: string }) {
  try {
    if (id) {
      const building = await dataStore.findBuildingsByLUID({ id });
      return building;
    }
  } catch (err) {
    console.log("Driver Error", err);
  }
}

export async function fetchBuildingLogsById({ luid }: { luid: string }) {
  try {
    if (luid) {
      const buildingLogs = await dataStore.fetchLogsbyBuildingId({ luid });
      return buildingLogs;
    }
  } catch (err) {
    console.log("Biz logic Error: ", err);
  }
}

import { Timestamp } from "@angular/fire/firestore";
import { Base } from "./base";
import { BaseUser } from "./user";

export interface Setlist extends Base {
  name: string;
  gigLocation: string;
  gigDate: Timestamp;
  deprecated: boolean;
  makePublic: boolean;
}

export class SetlistHelper {
  static getForAdd(data: Setlist, editingUser: BaseUser): Setlist {
    return {
      ...SetlistHelper.getForUpdate(data, editingUser),
      createdByUser: editingUser,
      dateCreated: Timestamp.fromDate(new Date()),
    };
  }
  static getForUpdate(data: Setlist, editingUser: BaseUser): Setlist {
    return {
      name: data.name ?? "",
      gigLocation: data.gigLocation ?? Timestamp.fromDate(new Date()),
      gigDate: data.gigDate ?? "",
      createdByUser: data.createdByUser ?? editingUser,
      dateCreated: data.dateCreated ?? Timestamp.fromDate(new Date()),
      lastEdit: Timestamp.fromDate(new Date()),
      deprecated: data.deprecated ?? false,
      makePublic: data.makePublic ?? false,
      lastUpdatedByUser: editingUser,
    };
  }
}

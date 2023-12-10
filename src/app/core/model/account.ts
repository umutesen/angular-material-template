import { Timestamp } from "@angular/fire/firestore";
import { Base } from './base';
import { BaseUser, UserHelper } from "./user";

export interface Account extends Base{
    name: string;
    description?: string;
    users?: string[];
    ownerUser: any;
}

export class AccountHelper{
  static getForAdd(user: BaseUser, account: Account): Account {
    const accountForAdd = this.getForUpdate(user, account);
    accountForAdd.dateCreated = Timestamp.fromDate(new Date());
    accountForAdd.createdByUser = user;
    accountForAdd.ownerUser = UserHelper.getForUpdate(user);

    return accountForAdd;
  }

  static getForUpdate(user: BaseUser, data: Account): Account {
        return {
          name: data.name ?? "",
          description: data.description ?? "",
          users: data.users ?? [],
          ownerUser: data.ownerUser ?? undefined,
          createdByUser: data.createdByUser ?? "",
          dateCreated: data.dateCreated ?? "",
          lastEdit: Timestamp.fromDate(new Date()),
          lastUpdatedByUser: user
        };
      }
}
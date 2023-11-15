import { Timestamp } from 'firebase/firestore'

export interface Account{
    name: string;
    id?: string;
    description?: string;
    users?: string[];
    ownerUserId: string;
    //url:string;
    //iconUrl: string;
    //createDate: Timestamp;
}

export class AccountHelper{
    static getAccountForAddOrUpdate(data: Account): Account {
        return {
          name: data.name ?? "",
          description: data.description ?? "",
          users: data.users ?? [],
          ownerUserId: data.ownerUserId ?? "",
        };
      }
}
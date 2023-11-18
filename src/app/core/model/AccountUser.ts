import { User, UserHelper } from "./user";

export interface AccountUser extends User  {
  role: string;
}

export class AccountUserHelper{
  static getAccountUserForAddOrUpdate(data: AccountUser): AccountUser {
      return {
        role: data.role ?? "",
        ...UserHelper.getUserForAddOrUpdate(data)
      };
    }
}
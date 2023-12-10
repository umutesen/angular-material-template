import { BaseUser, User, UserHelper } from "./user";

export interface AccountUser extends User  {
  role: string;
}

export class AccountUserHelper{
  static getForUpdate(data: AccountUser): AccountUser {
      return {
        role: data.role ?? "",
        ...UserHelper.getForUpdate(data)
      };
    }
}
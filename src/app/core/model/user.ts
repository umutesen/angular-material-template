export interface User {
  id?: string; //This is the id/key of the document
  uid: string; //This is the user ID that comes from the firebase auth.
  displayName: string;
  email: string;
  photoUrl: string;
}

export class UserHelper{
  static getUserForAddOrUpdate(data: User): User {
      return {
        uid: data.uid ?? "",
        displayName: data.displayName ?? "",
        email: data.email ?? "",
        photoUrl: data.photoUrl ?? "",
      };
    }
}
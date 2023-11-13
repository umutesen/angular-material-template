export interface User {
  id?: string; //This is the id/key of the document
  uid: string; //This is the user ID that comes from the firebase auth.
  displayName: string;
  email: string;
  photoUrl: string;
}

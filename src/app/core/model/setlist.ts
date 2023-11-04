import {Song} from './song';

export interface Setlist {
  
   id?: string;
   name: string;
   gigLocation: string;
   lastEdit: string;
   gigDate: string;
   createdByUserId: string;
   deleted: boolean;
   deprecated: boolean;
   makePublic: boolean;

}

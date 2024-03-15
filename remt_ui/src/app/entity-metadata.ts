import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { HouseInterface, UserTypeInterface } from './users/types/userTypes';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (users: UserTypeInterface)=>users._id,
    filterFn: function (users: UserTypeInterface[], search: string) {
      console.log('users from filter function ', users);      
     return users.filter(e=> -1 < e.userInfos.name.indexOf(search));
    }
  },
  House: {
    selectId: (houses: HouseInterface)=>houses._id,
    filterFn: function (houses: HouseInterface[], search: string) {
      console.log('houses from filter function ', houses);      
     return houses.filter(e=> -1 < e.street.indexOf(search));
    }
  }
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { UserTypeInterface } from './users/types/userTypes';

const entityMetadata: EntityMetadataMap = {
  User: {
    selectId: (users: UserTypeInterface)=>users.id,
    filterFn: (users: UserTypeInterface[], search: string)=> users.filter(e=> -1 < e.userInfos.name.indexOf(search))
  }
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

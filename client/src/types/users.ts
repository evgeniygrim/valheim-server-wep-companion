export enum UserStates {
  Offline = 0,
  Online = 1,
  Block = 2,
}

export interface User {
  id: string,
  fullName?: string,
  state: UserStates,
  company: string,
  department: string,
  position: string,
  avatar: string,
  firstName: string,
  lastName: string,
  middleName: string,
  sequence?: number,
}

export interface UserListQuery {
  from: number;
  to: number;
}

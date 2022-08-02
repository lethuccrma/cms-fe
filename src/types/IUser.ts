import IBase from './IBase';

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
}

type IUser = IBase & {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  avatarURL?: string;
  role?: USER_ROLE;
};

export default IUser;

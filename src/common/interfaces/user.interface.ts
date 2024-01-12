export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IPublicUser {
  username: string;
  email: string;
}

export interface IUserReferralData {
  points: number;
  referee_usernames: string[];
}

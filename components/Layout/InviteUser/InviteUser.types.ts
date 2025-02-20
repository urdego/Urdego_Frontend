export interface IUser {
  userId: number;
  nickname: string;
  level: number;
  activeCharacter: string;
  ownedCharacters: string[];
  invited: boolean;
}

export interface IComment {
  _id: string;
  content: string;
  mentions: string[];
  locationX: string;
  locationY: string;
  createdAt: Date;
  updatedAt: Date;
}

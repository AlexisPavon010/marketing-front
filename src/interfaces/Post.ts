export interface IPost {
  _id:         string;
  uid:         string;
  categories:  string;
  brand:       string;
  description: string;
  published:   boolean;
  status:      string;
  score:       number;
  createdAt:   Date;
  updatedAt:   Date;
  images:      string[];
  videos:      string[];
  email:       string;
  displayName: null;
  photoURL:    null;
  __v:         number;
}
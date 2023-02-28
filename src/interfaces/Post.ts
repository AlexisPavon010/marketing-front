export interface IPost {
  _id:         string;
  uid:         string;
  categories:  string;
  brand:       string;
  description: string;
  published:   boolean;
  status:      string;
  adminScore:  number;
  juryScore:   number;
  createdAt:   Date;
  updatedAt:   Date;
  images:      string[];
  videos:      string[];
  email:       string;
  username:    null;
  title:       string;
  result:      string;
  scored:      boolean;
  duration:    number;
  core_target: string
  photoURL:    null;
  __v:         number;
}
export interface User {
  deletedAt: string | null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  owner: boolean;
  photo: string | null;
}

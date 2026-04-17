export interface Activity {
  action: string;
  id: number;
  insertedAt: string;
  resourceId: number;
  resourceName: string | null;
  resourceType: string;
  userName: string | null;
}

enum Category {
  Warning,
  Information,
  Urgent,
}
export interface TParent {
  id: number;
  name: string;
  email: string;
  children: TChild[];
}
export interface TChild {
  id: number;
  name: string;
  grade: string;
  parent: TParent;
  parentId: number;
  incidents: TIncident[];
}
export interface TIncident {
  id: number;
  title: string;
  description: string;
  category: Category;
  child: TChild;
  childId: number;
  severity: number;
  occurredAt: Date;
}

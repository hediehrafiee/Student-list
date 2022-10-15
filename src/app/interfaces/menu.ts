export interface Menu {
  value: string;
  icon: string;
  children?: {
    title: string;
    value: string;
  }[];
}

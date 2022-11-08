import { TPost } from 'types/post';

export interface BtnFilterProps {
  title: string;
  filterType: string;
  filterStatus: string;
  onClick(): void;
  posts: TPost[];
}

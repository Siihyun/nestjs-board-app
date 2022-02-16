export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

export type BoardStatus = 'PUBLIC' | 'PRIVATE';

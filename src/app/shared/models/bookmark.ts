import { ITag } from '@app/shared/models/tag';

export interface IBookmark {
  id: string;
  title: string;
  url: string;
  icon: string;
  tags: string[] | ITag[];
  __typename: string;
}

export interface INewBookmark {
  title: string;
  url: string;
  tags: string[];
}

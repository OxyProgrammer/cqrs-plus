export interface FilterArgs {
  filterCriteria: string;
  filterData: string | number | undefined;
}
export interface Comment {
  commentId: string;
  username: string;
  commentDate: Date;
  comment: string;
  edited: boolean;
  postId: string;
}
export interface Post {
  postId: string;
  author: string;
  datePosted: Date;
  message: string;
  likes: number;
  comments: Comment[];
}
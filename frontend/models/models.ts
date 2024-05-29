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

const comments: Comment[] = [
  {
    commentId: 'c1',
    username: 'user1',
    commentDate: new Date(2024, 4, 10), // May 10, 2024
    comment: 'This is the first comment.',
    edited: false,
    postId: 'p1',
  },
  {
    commentId: 'c2',
    username: 'user2',
    commentDate: new Date(2024, 4, 11), // May 11, 2024
    comment: 'This is another comment.',
    edited: true,
    postId: 'p1',
  },
  {
    commentId: 'c3',
    username: 'user3',
    commentDate: new Date(2024, 4, 12), // May 12, 2024
    comment: 'Nice post!',
    edited: false,
    postId: 'p2',
  },
  {
    commentId: 'c4',
    username: 'user4',
    commentDate: new Date(2024, 4, 13), // May 13, 2024
    comment: 'I agree with this.',
    edited: false,
    postId: 'p3',
  },
];

const posts: Post[] = [
  {
    postId: 'p1',
    author: 'author1',
    datePosted: new Date(2024, 4, 9), // May 9, 2024
    message: 'This is the first post.',
    likes: 10,
    comments: comments.filter((comment) => comment.postId === 'p1'),
  },
  {
    postId: 'p2',
    author: 'author2',
    datePosted: new Date(2024, 4, 10), // May 10, 2024
    message: 'This is the second post.',
    likes: 20,
    comments: comments.filter((comment) => comment.postId === 'p2'),
  },
  {
    postId: 'p3',
    author: 'author3',
    datePosted: new Date(2024, 4, 11), // May 11, 2024
    message: 'This is the third post.',
    likes: 30,
    comments: comments.filter((comment) => comment.postId === 'p3'),
  },
];

export const getDummyPosts = (): Post[] => {
  return posts;
};

export const getDummyPostById = (postId: string): Post|undefined => {
  return posts.find((p) => p.postId === postId);
};

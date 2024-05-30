import { Post } from '@/models/models';
import { getGETRequest, getUrl } from '@/constants/appConstants';

const getPosts = async (request: RequestInfo): Promise<Post[]> => {
  try {
    const response = await fetch(request);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return [];
    }
    // Parse the JSON response
    const data: { posts: Post[]; message: string } = await response.json();
    return data.posts;
  } catch (error) {
    // Handle network errors or other issues
    console.error('Fetch error:', error);
    return [];
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl('postlookup'),
    getGETRequest()
  );
  return await getPosts(request);
};

export const getPostsByAuthor = async (author: string): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl(`postlookup/byauthor/${author}`),
    getGETRequest()
  );
  return await getPosts(request);
};

export const getPostsForMinLikes = async (
  minLikes: number
): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl(`postlookup/withlikes/${minLikes}`),
    getGETRequest()
  );
  return await getPosts(request);
};

export const getPostsWithComments = async (): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl('postlookup/withcomments'),
    getGETRequest()
  );
  return await getPosts(request);
};

export const addNewPost = async (
  message: string,
  author: string
): Promise<string> => {
  console.log(message, author);
  const newPostId = 'P1';
  return newPostId;
};

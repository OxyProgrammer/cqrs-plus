import { Post, Comment } from '@/models/models';
import { getRequest, getUrl } from '@/utility';

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

const handleNonGetRequests = async (request: RequestInfo): Promise<boolean> => {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return false;
    }
    // Parse the JSON response
    const data = await response.json();
    console.log(data);
    return true;
  } catch (error) {
    // Handle network errors or other issues
    console.error('Error:', error);
    return false;
  }
};

export const getCommentById = async (
  postId: string,
  commentId: string
): Promise<Comment | undefined> => {
  try {
    const request: RequestInfo = new Request(
      getUrl(`posts/${postId}/comments/${commentId}`),
      getRequest('GET')
    );
    const response = await fetch(request);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return undefined;
    }
    // Parse the JSON response
    const data = await response.json();
    return data as Comment;
  } catch (error) {
    // Handle network errors or other issues
    console.error('Fetch error:', error);
    return undefined;
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  const request: RequestInfo = new Request(getUrl('posts'), getRequest('GET'));
  return await getPosts(request);
};

export const getPostsByAuthor = async (author: string): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/byauthor/${author}`),
    getRequest('GET')
  );
  return await getPosts(request);
};

export const getPostsForMinLikes = async (
  minLikes: number
): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/withlikes/${minLikes}`),
    getRequest('GET')
  );
  return await getPosts(request);
};

export const getPostsWithComments = async (): Promise<Post[]> => {
  const request: RequestInfo = new Request(
    getUrl('posts/withcomments'),
    getRequest('GET')
  );
  return await getPosts(request);
};

export const addNewPost = async (
  message: string,
  author: string
): Promise<string> => {
  try {
    const request: RequestInfo = new Request(
      getUrl('posts'),
      getRequest('POST', {
        author,
        message,
      })
    );
    const response = await fetch(request);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return '';
    }
    // Parse the JSON response
    const data: { id: string; message: string } = await response.json();
    return data.id;
  } catch (error) {
    // Handle network errors or other issues
    console.error('Post error:', error);
    return '';
  }
};

export const editPost = async (
  postId: string,
  message: string
): Promise<boolean> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/${postId}`),
    getRequest('PUT', {
      message,
    })
  );
  return await handleNonGetRequests(request);
};

export const likePost = async (postId: string): Promise<boolean> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/like/${postId}`),
    getRequest('PUT')
  );
  return await handleNonGetRequests(request);
};

export const deletePost = async (
  postId: string,
  author: string
): Promise<boolean> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/${postId}'`),
    getRequest('DELETE', {
      username: author,
    })
  );
  return await handleNonGetRequests(request);
};

export const addComment = async (
  postId: string,
  commentText: string,
  author: string
): Promise<{ success: boolean; commentId: string }> => {
  try {
    const request: RequestInfo = new Request(
      getUrl(`posts/${postId}/comments`),
      getRequest('POST', {
        comment: commentText,
        username: author,
      })
    );
    const response = await fetch(request);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return { success: false, commentId: '' };
    }
    // Parse the JSON response
    const data: { id: string; message: string } = await response.json();
    return { success: true, commentId: data.id };
  } catch (error) {
    // Handle network errors or other issues
    console.error('Post error:', error);
    return { success: false, commentId: '' };
  }
};

export const editComment = async (
  postId: string,
  commentId: string,
  commentText: string,
  author: string
): Promise<boolean> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/${postId}/comments/${commentId}`),
    getRequest('PUT', {
      comment: commentText,
      username: author,
    })
  );
  return handleNonGetRequests(request);
};

export const deleteComment = async (
  postId: string,
  commentId: string,
  author: string
): Promise<boolean> => {
  const request: RequestInfo = new Request(
    getUrl(`posts/${postId}'/comment/${commentId}`),
    getRequest('DELETE', {
      username: author,
    })
  );
  return handleNonGetRequests(request);
};

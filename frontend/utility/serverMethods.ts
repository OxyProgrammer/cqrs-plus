'use server';
import { Post } from '@/models/models';
import { getRequest, getUrl } from '@/utility';

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const request: RequestInfo = new Request(
      getUrl(`posts/${postId}`),
      getRequest('GET')
    );
    const response = await fetch(request);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return null;
    }

    // Parse the JSON response
    const data: Post = await response.json();
    return data;
  } catch (error) {
    // Handle network errors or other issues
    console.error('Fetch error:', error);
    return null;
  }
};

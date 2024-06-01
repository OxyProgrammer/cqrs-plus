'use client';
import CommentsDashBoardComponent from '@/components/Comments/CommentsDashBoardComponent';
import PostEditor from '@/components/Posts/PostEditor';
import { getPostById } from '@/utility/clientMethods';
import { Post } from '@/models/models';
import React, { useEffect, useState } from 'react';

type PostPageProps = {
  params: { postId: string };
};

const PostPage = ({ params }: PostPageProps) => {
  const { postId } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [postNotFound, setPostNotFound] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const returnedPost: Post | null = await getPostById(postId);
      if (!returnedPost) {
        setPostNotFound(true);
      }
      setPost(returnedPost);
    })();
  }, [params]);

  if (postNotFound) {
    return (
      <div className='flex items-center justify-center min-h-screen text-3xl text-gray-700'>
        404 - Not Found
      </div>
    );
  } else if (post) {
    return (
      <div className='flex flex-col '>
        <div className='container mx-auto p-4 '>
          <div className='border-b-2 border-gray-300 mb-5'>
            <PostEditor post={post} />
          </div>
          <CommentsDashBoardComponent post={post} />
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex items-center justify-center min-h-screen text-3xl text-gray-700'>
        Loading...
      </div>
    );
  }
};

export default PostPage;

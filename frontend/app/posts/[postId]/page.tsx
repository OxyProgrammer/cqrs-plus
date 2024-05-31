import CommentsDashBoardComponent from '@/components/Comments/CommentsDashBoardComponent';
import PostEditor from '@/components/Posts/PostEditor';
import { getPostById } from '@/utility/serverMethods';
import { Post } from '@/models/models';
import { notFound } from 'next/navigation';
import React from 'react';

type PostPageProps = {
  params: { postId: string };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = params;
  let post: Post | null = await getPostById(postId);

  if (!post) {
    return notFound();
  }
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
};

export default PostPage;

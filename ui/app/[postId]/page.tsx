import CommentsCollection from '@/components/CommentsCollection';
import PostEditor from '@/components/PostEditor';
import { getDummyPostById } from '@/models/models';
import { notFound } from 'next/navigation';
import React from 'react';

type PostPageProps = {
  params: { postId: string };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = params;
  const post = getDummyPostById(postId);
  if (!post) {
    return notFound();
  }
  return (
    <div className='flex flex-col '>
      <div className='container mx-auto p-4 '>
        <div className='border-b-2 border-gray-300 mb-5'>
          <PostEditor post={post} />
        </div>
        <CommentsCollection comments={post.comments} />
      </div>
    </div>
  );
};

export default PostPage;

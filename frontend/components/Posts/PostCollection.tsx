import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Post } from '@/models/models';
import { IoStar } from 'react-icons/io5';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deletePost } from '@/utility/clientMethods';

interface PostCollectionProps {
  posts: Post[];
}

const PostCollection: React.FC<PostCollectionProps> = ({ posts }) => {
  const getLikeStars = (numberOfImages: number): React.ReactNode => {
    const stars = [];
    for (let i = 0; i < numberOfImages; i++) {
      stars.push(<IoStar key={i} color='#FFAC33' />);
    }
    return stars;
  };

  const onDeletePostRequested = async (postId: string, author: string) => {
    const ret = await deletePost(postId, author);
    if (ret) {
      toast.success('Successfully deleted post! Please refresh page!');
    } else {
      toast.error('Some error occurred while deleting post!');
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.postId}
          className='border border-gray-300 p-4 mb-4 rounded shadow-lg'
        >
          <Link
            href={`posts/${post.postId}`}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <div className='font-bold overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'>
              {post.message}
            </div>
          </Link>

          <div className='text-gray-500'>{post.author}</div>
          <div className='flex justify-between mt-2'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white p-2 rounded text-sm inline-flex items-center'
              onClick={() => onDeletePostRequested(post.postId, post.author)}
            >
              <FaRegTrashAlt />
            </button>
            <div className='flex flex-wrap justify-center'>
              {getLikeStars(post.likes)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCollection;

import { Post } from '@/models/models';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface PostCollectionProps {
  posts: Post[];
}

const PostCollection: React.FC<PostCollectionProps> = ({ posts }) => {
  function getFavouriteStars(numberOfImages: number): React.ReactNode {
    const images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push(
        <Image key={i} src='/star.svg' alt='star icon' height={20} width={20} />
      );
    }
    return images;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.postId}
          className='border border-gray-300 p-4 mb-4 rounded shadow-lg'
        >
          <Link href={`post/${post.postId}`} target={'_blank'} rel={'noreferrer'}>
            <div className='font-bold overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'>
              {post.message}
            </div>
          </Link>

          <div className='text-gray-500'>{post.author}</div>
          <div className='flex justify-between mt-2'>
            <button className='bg-red-500 hover:bg-red-700 text-white p-2 rounded text-sm inline-flex items-center'>
              <Image
                src='/delete.svg'
                alt='delete icon'
                height={20}
                width={20}
              />
            </button>
            <div className='flex flex-wrap justify-center'>
              {getFavouriteStars(post.likes)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCollection;

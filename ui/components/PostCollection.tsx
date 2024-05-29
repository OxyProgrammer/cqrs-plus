import Image from 'next/image';
import React from 'react';

export interface Post {
  id: string;
  message: string;
  author: string;
  likes: number;
}

interface PostCollectionProps {
  posts: Post[];
  // onDelete: (postId: string) => void;
  // onPostClick: (postId: string) => void;
  //, onDelete, onPostClick
  //
}

const PostCollection: React.FC<PostCollectionProps> = ({ posts }) => {

  function getFavouriteStars(numberOfImages: number): React.ReactNode {
    const images = [];
    for (let i = 0; i < numberOfImages; i++) {
      images.push(
        <Image
          key={i}
          src='star.svg'
          alt='star icon'
          height={20}
                width={20}
        />
      );
    }
    return images;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className='border border-gray-300 p-4 mb-4 rounded shadow-lg'
        >
          <div className='font-bold overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis'>
            {post.message}
          </div>
          <div className='text-gray-500'>{post.author}</div>
          <div className='flex justify-between mt-2'>
            <button className='bg-red-500 hover:bg-red-700 text-white p-2 rounded text-sm inline-flex items-center'>
              <Image
                src='delete.svg'
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

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/models/models';

interface PostEditorProps {
  post: Post;
}

const PostEditor: React.FC<PostEditorProps> = ({ post }) => {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(post.message);
  const [author, setAuthor] = useState(post.author);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setMessage(post.message)
    setAuthor(post.author)
    setEditMode(false);
  };
  
  const handleLikeClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <>
          <div className='font-bold overflow-hidden break-words text-2xl'>
            {message}
          </div>
          <div className='text-gray-500 text-xl'>{post.author}</div>
          <div className='flex justify-between my-2'>
            <button
              className=' bg-blue-500 hover:bg-blue-700 text-white text-lg px-2 py-1 rounded inline-flex items-center'
              onClick={handleEditClick}
            >
              <Image
                src='edit.svg'
                alt='edit icon'
                className='mr-2'
                height={20}
                width={20}
              />
              <span className='mt-1'>Edit</span>
            </button>
            <button
              className='bg-green-700 hover:bg-green-900 text-white px-2 py-1 text-lg rounded inline-flex items-center'
              onClick={handleLikeClick}
            >
              <span className='mt-1'>Like</span>
              <Image
                src='like.svg'
                alt='like icon'
                className='ml-2'
                height={20}
                width={20}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='font-bold text-lg mb-1'>Post Content:</div>
          <textarea
            className='block border w-full mb-4 rounded border-spacing-1 px-2 py-1'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
          <div className='font-bold text-lg mb-1'>Author:</div>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='block border w-full mb-4 text-sm p-2'
          />
          <div className='flex justify-between my-2'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-2 rounded'
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-2 rounded'
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostEditor;

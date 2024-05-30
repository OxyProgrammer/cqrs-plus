'use client';
import { addNewPost } from '@/constants/clientMethods';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AddPost: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  // const router = useRouter();
  const handleSaveClick = async () => {
    if (!message?.trim() || !author?.trim()) {
      alert('Both Message and Author needs to be supplied.');
      return;
    }
    const newPostId = await addNewPost(message, author);
    console.log(newPostId);
    // router.push(`post/${newPostId}`);
  };

  return (
    <div className='container'>
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
      <div className='flex justify-end my-2'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-2 rounded'
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPost;

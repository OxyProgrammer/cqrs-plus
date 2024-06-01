'use client';
import { addNewPost } from '@/utility/clientMethods';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegSave } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import SmartButton from '@/components/SmartButton';
import { SmartButtonTheme } from '@/components/SmartButton/SmartButtonTheme';

const AddPost: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const router = useRouter();

  const handleSaveClick = async () => {
    setIsBusy(true);
    if (!message?.trim() || !author?.trim()) {
      alert('Both Message and Author needs to be supplied.');
      return;
    }
    const newPostId = await addNewPost(message, author);
    if (newPostId) {
      toast.success('New Post created!');
    } else {
      toast.error('Some error occurred while creating new post!');
    }
    setIsBusy(false);
    router.push(`posts/${newPostId}`);
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
        <SmartButton
          onClick={handleSaveClick}
          isBusy={isBusy}
          theme={SmartButtonTheme.Primary}
        >
          <FaRegSave />
          <span className='ml-1'>Save</span>
        </SmartButton>
      </div>
    </div>
  );
};

export default AddPost;

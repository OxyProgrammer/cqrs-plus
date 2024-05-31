'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { Comment } from '@/models/models';

interface CommentEditorProps {
  comment: Comment;
}

const CommentEditor: React.FC<CommentEditorProps> = ({ comment }) => {
  
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState(comment.comment);
    const [author, setAuthor] = useState(comment.username);

    const handleEditClick = () => {
      setEditMode(true);
    };

    const handleCancelClick = () => {
      setMessage(comment.comment)
      setAuthor(comment.username)
      setEditMode(false);
    };
  
    const handleSaveClick = () => {
      setEditMode(false);
    };

    return (
      <div className='border-b-2 border-gray-200 mb-2'>
        {!editMode ? (
          <>
            <div className='font-bold break-words whitespace-nowrap'>
              {message}
            </div>
            <div className='text-gray-500'>{author}</div>
            <div className='flex justify-start my-2'>
              <button
                className=' bg-blue-500 hover:bg-blue-700 text-white p-2 rounded inline-flex items-center'
                onClick={handleEditClick}
              >
                <Image
                  src='/edit.svg'
                  alt='edit icon'
                  height={15}
                  width={15}
                />
              </button>
              <button
                className=' bg-red-500 hover:bg-red-700 text-white p-2 rounded inline-flex items-center ml-2'
                onClick={handleEditClick}
              >
                <Image
                  src='/delete.svg'
                  alt='edit icon'
                  height={15}
                  width={15}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='font-bold text mb-1'>Comment Content:</div>
            <textarea
              className='block border w-full mb-4 rounded border-spacing-1 px-2 py-1'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
            <div className='font-bold text mb-1'>Author:</div>
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
      </div>)
};

export default CommentEditor;

'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addComment, getCommentById } from '@/utility/clientMethods';
import { Comment } from '@/models/models';
import { FaRegSave } from 'react-icons/fa';

interface AddCommentComponentProps {
  postId: string;
  commentAdded: (newComment: Comment) => void;
}

const AddCommentComponent: React.FC<AddCommentComponentProps> = ({ postId,commentAdded }) => {
  const [message, setMessage] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleSaveClick = async () => {
    const { success, commentId } = await addComment(
      postId,
      message,
      author
    );
    if (success) {
      var newComment = await getCommentById(postId, commentId);
      if (newComment) {
        commentAdded(newComment)
        toast.success('Comment added successfully!');
        setMessage('');
        setAuthor('');
      } else {
        toast.error('Could not get the comment from read service!');
      }
    } else {
      toast.error('Some error occurred while adding comment!');
    }
  };

  return (
    <>
      <div className='font-bold text-lg mb-1'>Comment Content:</div>
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
          className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-2 rounded inline-flex items-center'
          onClick={handleSaveClick}
        >
          <FaRegSave />
          <span className='mt-1 ml-1 text-sm'>Save</span>
        </button>
      </div>
    </>
  );
};

export default AddCommentComponent;

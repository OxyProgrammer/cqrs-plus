'use client';
import React, { useState } from 'react';
import { Comment } from '@/models/models';
import { deleteComment, editComment } from '@/utility/clientMethods';
import toast from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';

interface CommentDisplayEditorComponentProps {
  comment: Comment;
  commentRemoved: (commentId: string) => void;
}

const CommentDisplayEditorComponent: React.FC<
  CommentDisplayEditorComponentProps
> = ({ comment, commentRemoved }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(comment.comment);
  const [author, setAuthor] = useState<string>(comment.username);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setMessage(comment.comment);
    setAuthor(comment.username);
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    const ret = await editComment(
      comment.postId,
      comment.commentId,
      message,
      author
    );
    if (ret) {
      setEditMode(false);
      toast.success('Comment removed successfully!');
    } else {
      toast.error('Some error occurred while updating comment.');
    }
  };

  const handleDeleteClick = async () => {
    const ret = await deleteComment(
      comment.postId,
      comment.commentId,
      comment.username
    );
    if (ret) {
      commentRemoved(comment.commentId);
      console.log('Comment deleted successfully!');
    } else {
      console.log('Some error occurred while deleting comment.');
    }
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
              <MdEdit />
            </button>
            <button
              className=' bg-red-500 hover:bg-red-700 text-white p-2 rounded inline-flex items-center ml-2'
              onClick={handleDeleteClick}
            >
              <FaRegTrashAlt />
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
    </div>
  );
};

export default CommentDisplayEditorComponent;

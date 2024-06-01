'use client';
import React, { useState } from 'react';
import { Comment } from '@/models/models';
import { deleteComment, editComment } from '@/utility/clientMethods';
import toast from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import SmartButton from '@/components/SmartButton';
import { SmartButtonTheme } from '@/components/SmartButton/SmartButtonTheme';

interface CommentDisplayEditorComponentProps {
  comment: Comment;
  commentRemoved: (commentId: string) => void;
}

const CommentDisplayEditorComponent: React.FC<
  CommentDisplayEditorComponentProps
> = ({ comment, commentRemoved }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(comment.comment);
  const [author, setAuthor] = useState<string>(comment.username);
  const [edited, setEdited] = useState<boolean>(comment.edited);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setMessage(comment.comment);
    setAuthor(comment.username);
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    setIsBusy(true);
    const ret = await editComment(
      comment.postId,
      comment.commentId,
      message,
      author
    );
    setEdited(true);
    if (ret) {
      setEditMode(false);
      toast.success('Comment removed successfully!');
    } else {
      toast.error('Some error occurred while updating comment.');
    }
    setIsBusy(false);
  };

  const handleDeleteClick = async () => {
    setIsBusy(true);
    const ret = await deleteComment(
      comment.postId,
      comment.commentId,
      comment.username
    );
    if (ret) {
      commentRemoved(comment.commentId);
      toast.success('Comment deleted successfully!');
    } else {
      toast.error('Some error occurred while deleting comment.');
    }
    setIsBusy(false);
  };

  return (
    <div className='border-b-2 border-gray-200 mb-2'>
      {!editMode ? (
        <>
          <div className='font-bold break-words whitespace-nowrap'>
            {message}
          </div>
          <div className='text-gray-500'>{author}</div>
          <div className='text-gray-300 text-xs'>{edited && 'Edited'}</div>
          <div className='flex justify-start my-2'>
            <SmartButton
              classNames='mr-2'
              onClick={handleEditClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Primary}
            >
              <MdEdit />
            </SmartButton>
            <SmartButton
              onClick={handleDeleteClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Danger}
            >
              <FaRegTrashAlt />
            </SmartButton>
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
            <SmartButton
              onClick={handleCancelClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Danger}
            >
              <span>Cancel</span>
            </SmartButton>
            <SmartButton
              onClick={handleSaveClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Danger}
            >
              <span>Save</span>
            </SmartButton>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentDisplayEditorComponent;

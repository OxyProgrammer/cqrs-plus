'use client';
import React, { useState } from 'react';
import { Comment, Post } from '@/models/models';
import CommentEditor from '@/components/CommentEditor';
import { addComment } from '@/constants/clientMethods';

interface CommentsCollectionProps {
  post: Post;
}
const CommentsCollection: React.FC<CommentsCollectionProps> = ({ post }) => {
  const [message, setMessage] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleSaveClick = async () => {
    const { success, commentId } = await addComment(
      post.postId,
      message,
      author
    );
    if (success) {
      post.comments.push({
        comment: message,
        username: author,
        commentId: commentId,
        postId: post.postId,
        commentDate: new Date(),//All bogus but ok for demo app
        edited: false,
      });
      console.log('successfully added comment');
      setMessage('');
      setAuthor('');
    } else {
      console.log('some error occurred while adding comment');
    }
  };

  return (
    <div className='container px-5'>
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
            className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-2 rounded'
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </>
      {post.comments.map((c) => (
        <CommentEditor key={c.commentId} comment={c} />
      ))}
    </div>
  );
};

export default CommentsCollection;

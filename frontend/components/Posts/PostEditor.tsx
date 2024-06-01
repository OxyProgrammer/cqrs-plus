'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Post } from '@/models/models';
import { editPost, likePost } from '@/utility/clientMethods';
import { MdEdit } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import SmartButton from '@/components/SmartButton';
import { SmartButtonTheme } from '@/components/SmartButton/SmartButtonTheme';

interface PostEditorProps {
  post: Post;
}

const getLikeStars = (numberOfImages: number): React.ReactNode => {
  const stars = [];
  for (let i = 0; i < numberOfImages; i++) {
    stars.push(<IoStar key={i} color='#FFAC33' />);
  }
  return stars;
};

const PostEditor: React.FC<PostEditorProps> = ({ post }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(post.message);
  const [author, setAuthor] = useState<string>(post.author);
  const [likes, setLikes] = useState<number>(post.likes);
  const [starsUi, setStarsUi] = useState<React.ReactNode>(
    getLikeStars(post.likes)
  );

  useEffect(() => {
    setStarsUi(getLikeStars(likes));
  }, [likes]);
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setMessage(post.message);
    setAuthor(post.author);
    setEditMode(false);
  };

  const handleLikeClick = async () => {
    setIsBusy(true);
    const ret = await likePost(post.postId);
    if (ret) {
      setLikes((prevLike) => prevLike + 1);

      toast.success('Successfully liked post!');
    } else {
      toast.error('Some error occurred while liking post!');
    }
    setIsBusy(false);
  };

  const handleSaveClick = async () => {
    setIsBusy(true);
    const ret = await editPost(post.postId, message);
    if (ret) {
      toast.success('Successfully edited post!');
    } else {
      toast.error('Some error occurred while editing post!');
    }
    setIsBusy(false);
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
          <div className='flex flex-wrap justify-end'>
            {starsUi}
          </div>
          <div className='flex justify-between my-2'>
            <SmartButton
              onClick={handleEditClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Primary}
            >
              <MdEdit />
              <span className='ml-1'>Edit</span>
            </SmartButton>
            <SmartButton
              onClick={handleLikeClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Success}
            >
              <span className='mr-1'>Like</span>
              <AiOutlineLike />
            </SmartButton>
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
          <div className='flex flex-wrap justify-end'>{starsUi}</div>
          <div className='flex justify-between my-2'>
            <SmartButton
              onClick={handleCancelClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Danger}
            >
              <MdCancel />
              <span className='ml-1'>Cancel</span>
            </SmartButton>
            <SmartButton
              onClick={handleSaveClick}
              isBusy={isBusy}
              theme={SmartButtonTheme.Danger}
            >
              <FaRegSave />
              <span className='ml-1'>Save</span>
            </SmartButton>
          </div>
        </>
      )}
    </div>
  );
};

export default PostEditor;

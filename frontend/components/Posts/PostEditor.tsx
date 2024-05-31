'use client';
import React, { useState } from 'react';
import { Post } from '@/models/models';
import { editPost, likePost } from '@/utility/clientMethods';
import { MdEdit } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { MdCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

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
    setMessage(post.message);
    setAuthor(post.author);
    setEditMode(false);
  };

  const handleLikeClick = async () => {
    const ret = await likePost(post.postId);
    if (ret) {
      console.log('successfully liked post');
    } else {
      console.log('some error occurred while liking post');
    }
  };

  const handleSaveClick = async () => {
    const ret = await editPost(post.postId, message);
    if (ret) {
      console.log('successfully edited post');
    } else {
      console.log('some error occurred while editing post');
    }

    setEditMode(false);
  };

  const getFavouriteStars=(numberOfImages: number): React.ReactNode =>{
    const stars = [];
    for (let i = 0; i < numberOfImages; i++) {
      stars.push(
        <IoStar color='#FFAC33'/>
      );
    }
    return stars;
  }

  return (
    <div>
      {!editMode ? (
        <>
          <div className='font-bold overflow-hidden break-words text-2xl'>
            {message}
          </div>
          <div className='text-gray-500 text-xl'>{post.author}</div>
          <div className='flex flex-wrap justify-end'>
            {getFavouriteStars(post.likes)}
          </div>
          <div className='flex justify-between my-2'>
            <button
              className=' bg-blue-500 hover:bg-blue-700 text-white text-lg px-2 py-1 rounded inline-flex items-center'
              onClick={handleEditClick}
            >
              <MdEdit />
              <span className='ml-1'>Edit</span>
            </button>
            <button
              className='bg-green-700 hover:bg-green-900 text-white px-2 py-1 text-lg rounded inline-flex items-center'
              onClick={handleLikeClick}
            >
              <span className='mr-1'>Like</span>
              <AiOutlineLike />
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
          <div className='flex flex-wrap justify-end'>
            {getFavouriteStars(post.likes)}
          </div>
          <div className='flex justify-between my-2'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-2 rounded inline-flex items-center'
              onClick={handleCancelClick}
            >
              <MdCancel/>
              <span className='ml-1'>Cancel</span>
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-2 rounded inline-flex items-center'
              onClick={handleSaveClick}
            >
              <FaRegSave/>
              <span className='ml-1'>Save</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostEditor;

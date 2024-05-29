'use client';
import React, { useState } from 'react';
import { Post } from './PostCollection';

interface PostEditorProps {
  post: Post;
}

const PostEditor: React.FC<PostEditorProps> = ({ post }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('Your Title');
  const [subtitle, setSubtitle] = useState('Your Subtitle');
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSubtitle, setEditedSubtitle] = useState(subtitle);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedTitle(title);
    setEditedSubtitle(subtitle);
  };

  const handleSaveClick = () => {
    setTitle(editedTitle);
    setSubtitle(editedSubtitle);
    setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <>
          <h1>{title}</h1>
          <h2>
            {subtitle}
            <button
              className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className='ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
              onClick={() => alert('Like')}
            >
              Like
            </button>
          </h2>
        </>
      ) : (
        <>
          <textarea
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className='block w-full mb-2'
            rows={3}
          />
          <input
            value={editedSubtitle}
            onChange={(e) => setEditedSubtitle(e.target.value)}
            className='block w-full mb-2'
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
            onClick={handleSaveClick}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default PostEditor;

import AddPost from '@/components/AddPost';
import React from 'react';

const NewPostPage: React.FC = () => {
  return (
    <div className='container mx-auto p-4 flex flex-col flex-grow min-h-screen'>
      <AddPost />
    </div>
  );
};

export default NewPostPage;

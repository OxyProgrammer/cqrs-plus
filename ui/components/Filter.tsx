'use client';
import React, { useState } from 'react';

interface FilterProps {
  //   onFilterSubmit: (filterOptions: FilterOptions) => void;
  //   onClearFilter: () => void;
  //{ onFilterSubmit, onClearFilter }
}

interface FilterOptions {
  postId?: string;
  author?: string;
  hasLikes?: boolean;
  minLikes?: number;
}
const Filter: React.FC<FilterProps> = () => {
  const [selectedOption, setSelectedOption] = useState<string>('None');
  const [postId, setPostId] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [minLikes, setMinLikes] = useState<number>(0);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    clearInputs();
  };

  const clearInputs = () => {
    setPostId('');
    setAuthor('');
    setMinLikes(0);
  };

  const handleSubmit = () => {
    const filterOptions: FilterOptions = {};
    if (postId !== '') {
      filterOptions.postId = postId;
    }
    if (author !== '') {
      filterOptions.author = author;
    }
    if (minLikes != 0) {
    }
    //   onFilterSubmit(filterOptions);
  };

  return (
    <div className='mb-2'>
      <div className='grid gap-6 mb-6 lg:grid-cols-4 md:grid-cols-2'>
        <div>
          <input
            type='radio'
            value='None'
            checked={selectedOption === 'None'}
            onChange={() => handleOptionChange('None')}
          />
          <span className='ml-2'>None</span>
        </div>
        <div>
          <input
            type='radio'
            value='Post Id'
            checked={selectedOption === 'Post Id'}
            onChange={() => handleOptionChange('Post Id')}
          />
          <span className='ml-2'>Post Id</span>
          <input
            type='text'
            placeholder='Post Id'
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            disabled={selectedOption !== 'Post Id'}
            className='border border-gray-300 px-2 py-1 ml-2'
          />
        </div>
        <div>
          <input
            type='radio'
            value='Author'
            checked={selectedOption === 'Author'}
            onChange={() => handleOptionChange('Author')}
          />
          <span className='ml-2'>Author</span>
          <input
            type='text'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={selectedOption !== 'Author'}
            className='border border-gray-300 px-2 py-1 ml-2'
          />
        </div>
        <div>
          <input
            type='radio'
            value='MinLikes'
            checked={selectedOption === 'MinLikes'}
            onChange={() => handleOptionChange('MinLikes')}
          />

          <span className='ml-2'>{'Likes >='}</span>

          <input
            type='number'
            placeholder='MinLikes'
            value={minLikes}
            onChange={(e) => setMinLikes(Number(e.target.value))}
            disabled={selectedOption !== 'MinLikes'}
            className='border border-gray-300 px-2 py-1 ml-2'
          />
        </div>
      </div>

      <div className='flex justify-end mt-4'>
        <button className='bg-blue-500 text-white px-4 py-2 mr-2'>
          Clear Filter
        </button>
        <button className='bg-green-700 text-white px-4 py-2'>Submit</button>
      </div>
    </div>
  );
};

export default Filter;

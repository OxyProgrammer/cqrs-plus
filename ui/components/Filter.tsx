'use client';
import { FilterArgs } from '@/models/models';
import React, { useState } from 'react';

interface FilterProps {
  filterRequested: (filterArguments: FilterArgs) => Promise<void>;
}
const Filter: React.FC<FilterProps> = ({ filterRequested }) => {
  const [selectedOption, setSelectedOption] = useState<string>('None');
  const [author, setAuthor] = useState<string>('');
  const [minLikes, setMinLikes] = useState<number>(0);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    clearInputs();
  };

  const clearInputs = () => {
    setAuthor('');
    setMinLikes(0);
  };

  const handleSubmit = async () => {
    const filterArgs: FilterArgs = {
      filterCriteria: selectedOption,
      filterData: undefined,
    };
    switch (selectedOption) {
      case 'None':
        break;
      case 'WithComments':
        break;
      case 'Author':
        if (!author) {
          alert('Provide Author.');
          return;
        }
        filterArgs.filterData = author;
        break;
      case 'MinLikes':
        if (!minLikes) {
          alert('Provide Minimum Likes.');
          return;
        }
        filterArgs.filterData = minLikes;
        break;
      default:
        alert('Some error happened!');
        break;
    }
    await filterRequested(filterArgs);
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
            value='WithComments'
            checked={selectedOption === 'WithComments'}
            onChange={() => handleOptionChange('WithComments')}
          />
          <span className='ml-2'>With Comments</span>
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
        <button
          className='bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Filter;

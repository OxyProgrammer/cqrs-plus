/**
 * IF SOMEONE POINTS THIS COMPONENENET AS WRITTEN INEFFICIENTLY, I WOULD AGREE.
 * IF SOMEONE WISHES TO MAKE THIS BETTER, PLEASE RAISE A PR.
 * SEE ALSO THE ADJACENT FILE CALLED : oldButton.tsx
 */

import React from 'react';
import { SmartButtonTheme } from './SmartButtonTheme';

interface SmartButtonProps {
  children: React.ReactNode;
  theme: SmartButtonTheme;
  isBusy: boolean;
  classNames?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SmartButton: React.FC<SmartButtonProps> = ({
  children,
  theme,
  isBusy,
  classNames,
  onClick,
}) => {
  switch (theme) {
    case SmartButtonTheme.Danger:
      if (classNames) {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
            >
              {children}
            </button>
          );
        }
      } else {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded inline-flex items-center`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded inline-flex items-center`}
            >
              {children}
            </button>
          );
        }
      }
    case SmartButtonTheme.Primary:
      if (classNames) {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
            >
              {children}
            </button>
          );
        }
      } else {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded inline-flex items-center`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded inline-flex items-center`}
            >
              {children}
            </button>
          );
        }
      }
    case SmartButtonTheme.Success:
      if (classNames) {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded inline-flex items-center ${classNames}`}
            >
              {children}
            </button>
          );
        }
      } else {
        if (isBusy) {
          return (
            <button
              onClick={onClick}
              className={`bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded inline-flex items-center`}
              disabled={true}
            >
              (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v8z'
                ></path>
              </svg>
              ){children}
            </button>
          );
        } else {
          return (
            <button
              onClick={onClick}
              className={`bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded inline-flex items-center`}
            >
              {children}
            </button>
          );
        }
      }
  }
};

export default SmartButton;

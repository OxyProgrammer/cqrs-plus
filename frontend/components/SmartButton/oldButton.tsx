/**
 * FOLLOWING WAS THE IMPLEMENTATION OF THE BETTER BUTTON THAT I HAD CREATED PREVIOUSLY.
 * HOWEVER, BECAUSE OF REASON(S) BEYOND MY UNDERSTANDING THE BUTTONS WOULD OFTEN START DISSAPPEARING
 * IN THE BROWESER (ESPCIALLY AFTER PRODUCTION BUILD IN DOCKER).
 * SEEMS THE DYNAMIC CLASSNAMES ATTRIBUTE HAS SOME CHALLENGES TO WORK WITH!

 */














// import React from 'react';
// import { SmartButtonTheme } from './SmartButtonTheme';

// interface SmartButtonProps {
//   children: React.ReactNode;
//   theme: SmartButtonTheme;
//   isBusy: boolean;
//   classNames?:string
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

// const SmartButton: React.FC<SmartButtonProps> = ({
//   children,
//   theme,
//   isBusy,
//   classNames,
//   onClick,
// }) => {
//   let colorName = '';
//   switch (theme) {
//     case SmartButtonTheme.Danger:
//       colorName = 'red';
//       break;
//     case SmartButtonTheme.Primary:
//       colorName = 'blue';
//       break;
//     case SmartButtonTheme.Success:
//       colorName = 'green';
//       break;
//   }

//   let classNameString = '';
//   classNameString = !isBusy
//     ? `bg-${colorName}-500 hover:bg-${colorName}-700 text-white py-1 px-2 rounded inline-flex items-center`
//     : `bg-${colorName}-500 hover:bg-${colorName}-700 text-white py-1 px-2 rounded inline-flex items-center opacity-50 cursor-not-allowed`;
//   if(classNames){
//     classNameString=`${classNameString} ${classNames}`
//   }
//   return (
//     <button onClick={onClick} className={classNameString} disabled={isBusy}>
//       {isBusy && (
//         <svg
//           className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
//           xmlns='http://www.w3.org/2000/svg'
//           fill='none'
//           viewBox='0 0 24 24'
//         >
//           <circle
//             className='opacity-25'
//             cx='12'
//             cy='12'
//             r='10'
//             stroke='currentColor'
//             strokeWidth='4'
//           ></circle>
//           <path
//             className='opacity-75'
//             fill='currentColor'
//             d='M4 12a8 8 0 018-8v8z'
//           ></path>
//         </svg>
//       )}
//       {children}
//     </button>
//   );
// };

// export default SmartButton;

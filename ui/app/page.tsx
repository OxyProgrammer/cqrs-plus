import AlternateFilter from '@/components/Filter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PostCollection, { Post } from '@/components/PostCollection';

const dummyPosts: Post[] = [
  {
    id: '1',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'John Doe',
  },
  {
    id: '2',
    message:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Jane Smith',
  },
  {
    id: '3',
    message:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: 'Alice Johnson',
  },
  {
    id: '4',
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Bob Brown',
  },
  {
    id: '5',
    message:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Eve Wilson',
  },
  {
    id: '6',
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Bob Brown',
  },
  {
    id: '7',
    message:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Eve Wilson',
  },
  {
    id: '8',
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    author: 'Bob Brown',
  },
  {
    id: '9',
    message:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    author: 'Eve Wilson',
  },
];

export default function Home() {
  // const onSubmit = () => {};
  // const onClear = () => {};
  return (
    <div className='flex flex-col'>
      {/* HEADER */}
      <Header />

      {/* Body */}
      <main className='container mx-auto p-4 flex flex-col flex-grow'>
        <AlternateFilter
        // onSubmit={onSubmit}
        // onClear={onClear}
        />
        <PostCollection posts={dummyPosts} />
      </main>
      <Footer />
    </div>
  );
}

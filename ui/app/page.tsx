'use client';
import AlternateFilter from '@/components/Filter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PostCollection from '@/components/PostCollection';
import {
  FilterArgs,
  Post,
  getDummyPostById,
  getDummyPosts,
} from '@/models/models';
import { useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(getDummyPosts());

  const filterRequested = async (filterArguments: FilterArgs) => {
    if (filterArguments.filterCriteria === 'PostId') {
      const post = getDummyPostById(filterArguments.filterData as string);
      if (post) {
        setPosts([post]);
      } else {
        setPosts([]);
      }
    } else {
      setPosts(getDummyPosts());
    }
    console.log(filterArguments);
  };

  return (
    <div className='flex flex-col'>
      {/* HEADER */}
      <Header />

      {/* Body */}
      <main className='container mx-auto p-4 flex flex-col flex-grow min-h-screen'>
        <AlternateFilter filterRequested={filterRequested} />
        <PostCollection posts={posts} />
      </main>
      <Footer />
    </div>
  );
}

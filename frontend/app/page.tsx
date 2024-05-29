'use client';
import AlternateFilter from '@/components/Filter';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PostCollection from '@/components/PostCollection';
import {
  getAllPosts,
  getPostsByAuthor,
  getPostsForMinLikes,
  getPostsWithComments,
} from '@/constants/clientMethods';
import { FilterArgs, Post } from '@/models/models';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const postList = await getAllPosts();
      setPosts(postList);
    })();
  }, []);

  const filterRequested = async (filterArguments: FilterArgs) => {
    const { filterCriteria, filterData } = filterArguments;
    let postList: Post[] = [];
    switch (filterCriteria) {
      case 'None':
        postList = await getAllPosts();
        break;
      case 'WithComments':
        postList = await getPostsWithComments();
        break;
      case 'Author':
        postList = await getPostsByAuthor(filterData as string);
        break;
      case 'MinLikes':
        postList = await getPostsForMinLikes(filterData as number);
        break;
    }
    setPosts(postList);
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

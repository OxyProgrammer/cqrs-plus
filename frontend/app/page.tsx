'use client';
import Filter from '@/components/Filter';
import toast from 'react-hot-toast';
import PostCollection from '@/components/Posts/PostCollection';
import {
  getAllPosts,
  getPostsByAuthor,
  getPostsForMinLikes,
  getPostsWithComments,
} from '@/utility/clientMethods';
import { FilterArgs, Post } from '@/models/models';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const postList = await getAllPosts();
      if(!postList || postList.length===0){
        toast.error("Could not load any posts!")
      }
      setPosts(postList);
    })();
  }, []);

  const filterRequested = async (filterArguments: FilterArgs) => {
    console.log('Reached here')
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
    <>
      <Filter filterRequested={filterRequested} />
      <PostCollection  posts={posts} />
    </>
  );
}

'use client';
import AddPost from '@/components/AddPost';
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

  return <AddPost />;
}

 {/* <AlternateFilter filterRequested={filterRequested} />
        <PostCollection posts={posts} /> */}
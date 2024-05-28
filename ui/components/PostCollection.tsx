import React from 'react';

export interface Post {
  id: string;
  message: string;
  author: string;
}

interface PostCollectionProps {
  posts: Post[];
  // onDelete: (postId: string) => void;
  // onPostClick: (postId: string) => void;
  //, onDelete, onPostClick 
  //
}

const PostCollection: React.FC<PostCollectionProps> = ({ posts}) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-300 p-4 mb-4">
          <div className="font-bold overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis">{post.message}</div>
          <div className="text-gray-500">{post.author}</div>
          <div className="flex justify-between mt-2">
            <div>
              <button className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCollection;

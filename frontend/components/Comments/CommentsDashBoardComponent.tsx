import React from 'react';
import { Post } from '@/models/models';
import CommentDisplayEditorComponent from '@/components/Comments/CommentDisplayEditorComponent';
import AddCommentComponent from '@/components/Comments/AddCommentComponent';

interface CommentsDashBoardComponentProps {
  post: Post;
}
const CommentsDashBoardComponent: React.FC<CommentsDashBoardComponentProps> = ({ post }) => {
 
  return (
    <div className='container px-5'>
     <AddCommentComponent post={post}/>
      {post.comments.map((c) => (
        <CommentDisplayEditorComponent key={c.commentId} comment={c} />
      ))}
    </div>
  );
};

export default CommentsDashBoardComponent;

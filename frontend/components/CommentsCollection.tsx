import React from 'react';
import { Comment } from '@/models/models';
import CommentEditor from '@/components/CommentEditor';

interface CommentsCollectionProps {
  comments: Comment[];
}
const CommentsCollection: React.FC<CommentsCollectionProps> = ({ comments }) => {
  return (
    <div className='container px-5'>
      {comments.map((c) => (
        <CommentEditor key={c.commentId} comment={c} />
      ))}
    </div>
  );
};

export default CommentsCollection;

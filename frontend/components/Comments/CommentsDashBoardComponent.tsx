'use client';
import React, { useState } from 'react';
import { Post, Comment } from '@/models/models';
import CommentDisplayEditorComponent from '@/components/Comments/CommentDisplayEditorComponent';
import AddCommentComponent from '@/components/Comments/AddCommentComponent';

interface CommentsDashBoardComponentProps {
  post: Post;
}
const CommentsDashBoardComponent: React.FC<CommentsDashBoardComponentProps> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const commentRemoved = (commentId: string) => {
    const restComments = comments.filter((c) => c.commentId !== commentId);
    setComments(restComments);
  };

  const newCommentAdded = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };
  return (
    <div className='container px-5'>
      <AddCommentComponent
        postId={post.postId}
        commentAdded={newCommentAdded}
      />
      {comments.map((c) => (
        <CommentDisplayEditorComponent commentRemoved={commentRemoved} key={c.commentId} comment={c} />
      ))}
    </div>
  );
};

export default CommentsDashBoardComponent;

import * as React from 'react';

import './postDetails.css';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

export type PostDetailsProps =
{
  post: Post;
  comments: Comment[];
}

export const PostsDetails = ({ post, comments }: PostDetailsProps) => {
  return (
    <div className='postDetails'>
      <div>
        <p className='title'>{post.title}</p>
        <p className='userId'>Posted by user {post.userId}</p>
      </div>
      <div className='detailsBody'>
        {post.body} 
      </div>
      <p>{comments.length} comments</p>
    </div>
  );
}

export default PostsDetails
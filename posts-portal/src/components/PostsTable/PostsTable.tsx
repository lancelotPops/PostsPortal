import * as React from 'react';
import { useState } from 'react';

import './postsTable.css';

import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper 
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

import PostDetails from '../PostDetails';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { getCommentsForAPost } from '../../services/comments/commentsAPI';

export type PostsTableProps =
{
  posts: Post[];
}

type RowProps =
{
  post: Post;
}

// Return the row for a given post
const Row = ({ post }: RowProps) => {

  // Used to display/hide details of a post
  const [open, setOpen] = React.useState(false);

  // Comments of a given post
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const getPostComments = async (postId: number) => {
    const comments = await getCommentsForAPost(postId);
    setPostComments(comments);
  }

  // Display/hide post details
  const handleCollapse = (postId: number) => {
    if (!open)
      getPostComments(postId);
    setOpen(!open);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* Post id */}
        <TableCell>
          {post.id}
        </TableCell>
        {/* Collapse */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleCollapse(post.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* User id */}
        <TableCell component="th" scope="row">
          {post.userId}
        </TableCell>
        {/* Post title */}
        <TableCell>
          {post.title}
        </TableCell>
      </TableRow>
      {/* Post details */}
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <PostDetails
              post={post}
              comments={postComments}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const PostsTable = ({ posts }: PostsTableProps) => {
  const headerBgColor = '#26a39b';

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table
          aria-label="sticky collapsible table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {/* Post id */}
              <TableCell
                className='idColumn'
                style={{backgroundColor: headerBgColor}}
              >
                Post
              </TableCell>
              {/* Collapse */}
              <TableCell
                className='collapseColumn'
                style={{backgroundColor: headerBgColor}}
              />
              {/* User id */}
              <TableCell
                className='userIdColumn'
                style={{backgroundColor: headerBgColor}}
              >
                User id
              </TableCell>
              {/* Post title */}
              <TableCell
                style={{backgroundColor: headerBgColor}}
              >
                Title
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <Row key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </div>
  );
}

export default PostsTable;
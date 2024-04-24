import * as React from 'react';

import './posts.css';

import PostsTable from '../../components/PostsTable';
import { getPosts } from '../../services/Posts/postsAPI';
import {
  useEffect,
  useState
} from 'react';
import { Post } from '../../types/Post';
import SearchBar from '../../components/SearchBar';

export const Posts = () => {
  // All existing posts
  const [posts, setPosts] = useState<Post[]>([]);
  // Posts matching the search
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  // Get all posts
  useEffect(() => {
    const fetchDataForPosts = async () => {
      const response = await getPosts();
      setPosts(response);
      setFilteredPosts(response);
    };

    fetchDataForPosts(); 
  },[])

  // Update posts to display based on search value
  useEffect(() => {
    const sample = posts.filter(p => p.title.includes(searchValue));
    setFilteredPosts(sample)    
  },[searchValue])

  return (
    <div>
      <div className='pageHeader'>
        <h1>Welcome to the Posts portal</h1>
      </div>
      <div className='searchBar'>
        <SearchBar
          onChange={(value: string) => setSearchValue(value)}
          onClear={() => setSearchValue("")}
        >
        </SearchBar>
      </div>
      <PostsTable posts={filteredPosts} />
      <div className='count'>
        <p>{filteredPosts.length} post(s) out of {posts.length}</p>
      </div>
    </div>
  )
}

export default Posts;
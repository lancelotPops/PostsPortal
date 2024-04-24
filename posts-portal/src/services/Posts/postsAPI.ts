import { Post } from "../../types/Post";

export async function getPosts (): Promise<Post[]> {

  const url = 'https://jsonplaceholder.typicode.com/posts';

  const response = await fetch(url);
  const posts = await response.json();

  return posts;
}
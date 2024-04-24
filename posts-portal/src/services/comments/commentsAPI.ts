import { Comment } from "../../types/Comment";

export async function getCommentsForAPost (postId: number): Promise<Comment[]> {

  const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

  const response = await fetch(url);
  const comments = await response.json();

  return comments;
}
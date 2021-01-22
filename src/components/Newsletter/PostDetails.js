import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Comment from './Comment';

const url = 'https://jsonplaceholder.typicode.com/posts';

const PostDetails = () => {
  let { id } = useParams();

  const [post, setPosts] = useState({});
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const fetchPosts = async () => {
    const respPost = await fetch(`${url}/${id}`);
    const post = await respPost.json();
    const respComments = await fetch(`${url}/${id}/comments`);
    const comments = await respComments.json();
    setTitle(post.title);
    setDescription(post.body);
    setPosts(post);
    setComments(comments);
    console.log(post.userId)

  }

  //Handle i delete post nije gotovo :D
  const handlePost = () => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title,
        body: description,
        userId: post.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const deletePost = () => {
    console.log(`delete${id}`)
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  if (post.id) {
    return (
      <section className="users-company-wrapper">
        <div className="title-wrapper">
          <h1>Post Details:</h1>
          <div className="button-wrapper">
            <button className="btn" type="submit" form="editPostForm">Edit</button>
            <button className="btn" onClick={deletePost}>Delete</button>
          </div>
        </div>
        <form id="editPostForm" className="posts-form" onSubmit={handlePost}>
          <h3>Title:</h3>
          <textarea id="post-title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
          <h3>Description:</h3>
          <textarea id="post-description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </form>
        <section className="comments">
          <h3>Comments:</h3>
          {
            comments.map(comment => { return <Comment key={comment.id} {...comment} /> })
          }
        </section>
      </section>
    )
  }
  return 'Loading...'

}

export default PostDetails

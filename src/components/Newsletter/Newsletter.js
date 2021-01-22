import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const url = 'https://jsonplaceholder.typicode.com/posts';

const Newsletter = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const resp = await fetch(url);
    const posts = await resp.json();
    setPosts(posts)

  }

  useEffect(() => {
    fetchPosts();
  }, [])




  return (
    <section className="users-company-wrapper">
      <div className="title-wrapper">
        <h1>Posts:</h1>
      </div>
      {
        posts.length < 1 ? <h1>Loading...</h1> : posts.map(post => {
          const { id, title, body } = post;
          return (
            <Link key={id} to={`/postdetails/${id}`}>
              <article className="post">
                <h3>{title}</h3>
                <p><span>Description: </span>{body}</p>
              </article>
            </Link>
          )
        })
      }
    </section>
  )
}

export default Newsletter

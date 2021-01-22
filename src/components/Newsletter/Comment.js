import React, { useState } from 'react'

const Comment = ({ postId, id, name, email, body }) => {

  const [readMore, setReadMore] = useState(false);
  const [toggle, setToggle] = useState(false)

  return (
    <div className="post" onClick={() => setToggle(!toggle)}>
      <span className="comment-email">{toggle === true ? name : email}</span>
      <h4>{name}</h4>
      <p>
        {toggle === false ? `${body.substring(0, 15)}... ` : `${body}`}
        <br />
        <button onClick={() => setReadMore(!toggle)}> {toggle === false ? `Read More...` : ` Show Less.`}</button>
      </p>
    </div>
  )
}

export default Comment

import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([
      {
        _id: 1,
        image: "https://ik.imagekit.io/oozka8wmk/image_Z7rtzCNT3.jpg",
        caption: "Caption for image 1",
      },
    ]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then((res) => {
            setPosts(res.data.posts)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
  return (
    <section className="feed-section">
          {posts.length > 0 ? (
              posts.map((post) => (<div key={post.id} className='post-card'>
                  <img src={post.image} alt={post.caption} />
                  <p>{ post.caption}</p>
              </div>))) : (
                  <h1>No posts avaliable</h1>
              )

        }
    </section>
  )
}

export default Feed

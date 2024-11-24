import './Posts.css'
import Post from './Post'
import { useSelector } from 'react-redux'
import { selectPosts } from './postsSlice'

function Posts() {
    const posts = useSelector(selectPosts)

    return (
        <div className="Posts">
            {posts.map(post => <Post post={post} key={post.title + post.score} />)}
        </div>
    )
}

export default Posts;
import './Posts.css'
import Post from './Post'
import { useSelector } from 'react-redux'
import { selectPosts } from './postsSlice'

function Posts() {
    const posts = useSelector(selectPosts)

    return (
        <div className="Posts">
            {posts.filter(post => post.id).map(post => <Post post={post} key={post.id} />)}
        </div>
    )
}

export default Posts;
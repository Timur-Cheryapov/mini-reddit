import './Post.css'
import upArrow from '../../stock/up-arrow-svgrepo-com.svg'
import downArrow from '../../stock/down-arrow-svgrepo-com.svg'
import commentsIcon from '../../stock/comments-outlined-conversation-svgrepo-com.svg'
import profileIcon from '../../stock/profile-circle-svgrepo-com.svg'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Post(props) {
    const { post } = props
    const { isLoading } = useSelector((state) => state.posts)

    return (
        <div className="Post">
            <div className="PostScore">
                <img src={upArrow} alt="Upvote" />
                <h2>{isLoading ? <Skeleton /> : post.score}</h2>
                <img src={downArrow} alt="Downvote" />
            </div>
            <div className="PostContainer">
                <h1>{isLoading ? <Skeleton /> : <a href={post.url} target="_blank" rel="noreferrer">{post.title}</a>}</h1>
                <div className="PostImageContainer">
                    {isLoading ? (
                        <Skeleton height="25rem" />
                    ) : (
                        <img src={post.img} alt="Post thumbnail"/>
                    )}
                </div>
                <div className="PostData">
                    <div className="PostProfile">
                        <img src={profileIcon} alt="Profile" />
                        <p>{isLoading ? <Skeleton width="7rem"/> : post.postedBy}</p>
                    </div>
                    <p>{isLoading ? <Skeleton width="7rem"/> : post.date}</p>
                    <div className="PostComments">
                        <p>{isLoading ? <Skeleton width="7rem"/> : post.comments}</p>
                        <img src={commentsIcon} alt="Comments" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
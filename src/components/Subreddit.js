import './Subreddit.css'
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

function Subreddit({ subreddit, onClick, isSelected }) {
    const { isLoading } = useSelector(state => state.subreddits)

    const style = {
        boxShadow: isSelected ? '0 0 10px 5px green' : '0 0 10px 5px lightgray',
    }

    return (
        <div className="Subreddit">
            {isLoading ? (
                <Skeleton height="4rem" width="6rem"/>
            ) : (
                <>
                    <img style={style} src={subreddit.img} alt={subreddit.title} onClick={onClick} />
                    <p>{subreddit.titlePrefixed}</p>
                </>
            )}
        </div>
    )
}

export default Subreddit;
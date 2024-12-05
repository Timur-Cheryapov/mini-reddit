import './Subreddits.css'
import Subreddit from './Subreddit';
import { selectSubreddits } from "../subredditsSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

function Subreddits() {
    const navigate = useNavigate()

    const subreddits = useSelector(selectSubreddits)
    const { subredditName } = useParams()
    const { hasError } = useSelector(state => state.subreddits)

    const onSubredditClickHandlerCreator = (id) => {
        return () => {
            navigate('/mini-reddit' + subreddits[id].url)
        }
    }

    if (hasError) return <p>Failed to load subreddits</p>

    return (
        <div className="Subreddits">
            {Object.keys(subreddits).map(id => 
                <Subreddit
                    subreddit={subreddits[id]}
                    key={id}
                    onClick={onSubredditClickHandlerCreator(id)}
                    isSelected={'/r/' + subredditName + '/' === subreddits[id].url}
                />
            )}
        </div>
    )
}

export default Subreddits;
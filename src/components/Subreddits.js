import './Subreddits.css'
import Subreddit from './Subreddit';
import { selectSubreddits, selectSubreddit } from "./subredditsSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSubreddit } from './subredditsSlice';

function Subreddits() {
    const dispatch = useDispatch()
    const subreddits = useSelector(selectSubreddits)
    const currentSubreddit = useSelector(selectSubreddit)
    const { hasError } = useSelector(state => state.subreddits)

    const onSubredditClickHandlerCreator = (id) => {
        return () => {
            dispatch(setSubreddit(id))
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
                    isSelected={currentSubreddit.id === id}
                />
            )}
        </div>
    )
}

export default Subreddits;
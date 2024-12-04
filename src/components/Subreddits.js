import './Subreddits.css'
import Subreddit from './Subreddit';
import { selectSubreddits } from "./subredditsSlice";
import { useSelector } from "react-redux";

function Subreddits() {
    const subreddits = useSelector(selectSubreddits)

    return (
        // TODO: Make subreddits clickable
        <div className="Subreddits">
            {Object.keys(subreddits).map(id => 
                <Subreddit
                    subreddit={subreddits[id]}
                    key={id}
                />
            )}
        </div>
    )
}

export default Subreddits;
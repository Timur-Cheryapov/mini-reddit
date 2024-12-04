import './Subreddit.css'

function Subreddit({ subreddit }) {

    return (
        <div className="Subreddit">
            <img src={subreddit.img} alt={subreddit.title} />
            <p>{subreddit.url}</p>
        </div>
    )
}

export default Subreddit;
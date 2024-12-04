import logo from './icons8-reddit.svg';
import './App.css';
import Posts from './components/Posts'
import Subreddits from './components/Subreddits';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, searchPosts } from './components/postsSlice';
import { loadSubreddits } from './components/subredditsSlice';
import { selectSubreddit } from './components/subredditsSlice';

function App() {
  // TODO: Change current url to let users go back and forward
  const dispatch = useDispatch()
  const { hasError } = useSelector((state) => state.posts)

  // TODO: Make subreddit change with respect to the user's click in subredits list
  const subreddit = useSelector(selectSubreddit)

  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(loadPosts(subreddit.url))
    dispatch(loadSubreddits())
  }, [dispatch, subreddit])

  const onTryAgainHandler = () => {
    if (query) {
      dispatch(searchPosts(query))
    } else {
      dispatch(loadPosts(subreddit.url))
    }
  }

  const onQueryChangeHandler = ({ target }) => {
    setQuery(target.value)
  }

  const onSearchHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchPosts(query))
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>MiniReddit</p>
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="SearchBar"
          onChange={onQueryChangeHandler}
          value={query}
          onKeyUp={onSearchHandler} />
      </header>
      <main>
        {hasError ? (
          <>
            <h2>Oh no! Looks like we were unable to find posts!</h2>
            <p>Maybe you don't have internet connection or the limit of 10 requests per minute was exceeded.</p>
            <button onClick={onTryAgainHandler}>Try again</button>
          </>
        ) : (
          <>
            <Subreddits />
            <Posts />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

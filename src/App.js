import logo from './icons8-reddit.svg';
import './App.css';
import Posts from './components/Posts'
import Subreddits from './components/Subreddits';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, searchPosts } from './components/postsSlice';
import { loadSubreddits } from './components/subredditsSlice';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hasError } = useSelector((state) => state.posts)

  const { subredditName } = useParams()

  const [query, setQuery] = useState('')
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q')

  useEffect(() => {
    dispatch(loadSubreddits())
    navigate('/mini-reddit/r/pics/')
  }, [dispatch])

  useEffect(() => {
    if (subredditName !== undefined) dispatch(loadPosts('/r/' + subredditName))
    if (queryFromUrl) dispatch(searchPosts(queryFromUrl))
  }, [dispatch, navigate, subredditName, queryFromUrl])

  const onTryAgainHandler = () => {
    if (query) {
      dispatch(searchPosts(query))
    } else {
      dispatch(loadPosts('/r/' + subredditName))
    }
  }

  const onQueryChangeHandler = ({ target }) => {
    setQuery(target.value)
  }

  const onSearchHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchPosts(query))
      navigate(`/mini-reddit?q=${query}`)
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

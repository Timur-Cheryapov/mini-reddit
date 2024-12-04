import logo from './icons8-reddit.svg';
import './App.css';
import Posts from './components/Posts'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts, searchPosts } from './components/postsSlice';

function App() {
  const dispatch = useDispatch()
  const { hasError } = useSelector((state) => state.posts)
  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const onTryAgainHandler = () => {
    dispatch(loadPosts())
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
          <Posts />
        )}
      </main>
    </div>
  );
}

export default App;

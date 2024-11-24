import logo from './icons8-reddit.svg';
import './App.css';
import Posts from './components/Posts'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from './components/postsSlice';

function App() {
  const dispatch = useDispatch()
  const { hasError } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const onTryAgainHandler = () => {
    dispatch(loadPosts())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>MiniReddit</p>
      </header>
      <main>
        {hasError ? (
          <>
            <h2>Oh no! Looks like we were unable to find posts!</h2>
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

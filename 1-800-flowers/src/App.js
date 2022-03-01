import { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import PostDetail from './components/PostDetail';
import SearchInput from './components/SearchInput';
import { getPostsStart } from './redux/slices/postsSlice';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const App = () => {
  const dispatch = useDispatch()
  const { isLoading, posts, error, updatedPost } = useSelector((state) => state.posts)
  const [postFound, setPostFound] = useState({});
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    dispatch(getPostsStart())
  }, [dispatch])

  useEffect(() => {
    const newPostFound = [...posts].find(({ id }) => postFound.id === id)
    setPostFound({ ...newPostFound })
  }, [posts])

  const onPostChange = (val) => {
    const foundPost = posts.find(({ title }) => title === val)
    setPostFound(foundPost)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const openSuccess = action => setOpen(action)

  return (
    <div style={{ alignItems: 'center' }}>
      {!!posts.length && !isLoading && !error && <SearchInput title={posts.map(({ title }) => title)} postChange={onPostChange} updatedPost={updatedPost} />}
      <div style={{ marginLeft: '38%', marginTop: 50 }}>
        {postFound && !!Object.keys(postFound).length && <PostDetail post={postFound} openSuccess={openSuccess} />}
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

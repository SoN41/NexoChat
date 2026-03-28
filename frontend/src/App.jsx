import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/login/Login';
import Home from './pages/home/Home'
import SignUp from './pages/signup/SignUp'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Settings from './pages/settings/settings';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <Routes>
        {/* Home takes full screen */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
        
        {/* Auth pages stay centered with padding */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : (
          <div className='p-4 w-full flex items-center justify-center'>
            <Login />
          </div>
        )} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : (
          <div className='p-4 w-full flex items-center justify-center'>
            <SignUp />
          </div>
        )} />
        <Route path='/settings' element={authUser ? (
          <div className='p-4 w-full flex items-center justify-center'>
            <Settings />
          </div>
        ) : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
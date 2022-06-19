import { Route, Routes } from 'react-router-dom';
// import { ProtectedRoutes } from './components/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';

export const RoutesTree = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      {/* <Route path='/feed' element={<ProtectedRoutes />}> */}
      <Route path='feed' element={<Home />} />
      {/* </Route> */}
    </Routes>
  );
};

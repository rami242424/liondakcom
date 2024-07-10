import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
// import Login from '@pages/user/Login';

function App(  ) {
  return (
    <>
      <RouterProvider router={ router } />
      
    </>
  )
}

export default App;
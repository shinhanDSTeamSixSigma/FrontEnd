import { RouterProvider } from 'react-router-dom';

import root from './router/root';
import Layout from './layouts/Layout';

function App() {
  return (
    <>
      <RouterProvider router={root}>
        <Layout />
      </RouterProvider>
    </>
  );
}

export default App;

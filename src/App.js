import { RouterProvider } from 'react-router-dom';

import root from './router/root';
import Layout from './layouts/Layout';
import './styles/App.css';

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

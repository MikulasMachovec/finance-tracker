import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import AppRoutes from './routes/AppRoutes';
import { SessionProvider } from './context/sessionProvider';

function App() {
  const [ collapsed, setCollapsed ] = useState(false) 

  return (
    <>
    <SessionProvider>
      <BrowserRouter>
            <AppRoutes />
      </BrowserRouter>
    </SessionProvider>
    
    <Toaster
    position="top-right"
    toastOptions={{
        duration: 3000,
    }}
    />  

</>
  )
}

export default App;

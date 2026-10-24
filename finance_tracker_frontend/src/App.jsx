import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes';
import { SessionProvider } from './context/sessionProvider';
import PreferencesProvider from './context/preferencesProvider';
import ThemeProvider from './context/themeProvider';

function App() {
  const [ collapsed, setCollapsed ] = useState(false) 

  return (
    <>
    <SessionProvider>
      <PreferencesProvider>
        <ThemeProvider>
          <BrowserRouter>
                <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </PreferencesProvider>
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

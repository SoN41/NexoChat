// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthContextProvider } from './context/AuthContext.jsx'
// import { SocketContextProvider } from './context/socketContext.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContextProvider>
//         <SocketContextProvider>
//           <App />
//         </SocketContextProvider>
//       </AuthContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )

// index.js or index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/socketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          {/* <AuthProvider> */}
            <App />
          {/* </AuthProvider> */}
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

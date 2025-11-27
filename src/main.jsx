import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Sign from './components/Sign.jsx'
import Home from './components/Home.jsx'
import { AuthLayout } from './components/AuthLayout.jsx'
import { ToastContainer } from 'react-toastify'
import ShowAllPosts from './components/ShowAllPosts.jsx'
import Explore from './components/Explore.jsx'
import Profile from './components/Profile.jsx'
import ProfilePosts from './components/ProfilePosts.jsx'
import SavedPosts from './components/SavedPosts.jsx'
import EditProfile from './components/EditProfile.jsx'
import Messages from './components/Messages.jsx'
import Chatbox from './components/Chatbox.jsx'
import MessageBar from './components/MessageBar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign",
        element: <Sign />
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: (<ShowAllPosts />)
          },
          {
            path: "/explore",
            element: (<Explore />)
          },
          {
            path: "/profile/:username",
            element: (<AuthLayout> <Profile /> </AuthLayout>),
            children: [
              {
                path: "posts",
                element: <ProfilePosts />
              },
              {
                path: "savedposts",
                element: <SavedPosts />
              },
            ]
          },
          {
            path: "account/edit",
            element: (<AuthLayout> <EditProfile /></AuthLayout>)
          },

        ]
      },
      {
        path: "chat/messages",
        element: (<AuthLayout><Messages /></AuthLayout>),
        children: [
          {
            path: "",
            element: (<MessageBar inMobile={true} />)
          },
          {
            path: "user/:userId",
            element: (<Chatbox />)
          }
        ]
      },
    ]
  }

])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
  // </StrictMode>,
)

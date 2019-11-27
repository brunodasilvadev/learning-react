import React, { useReducer, useEffect, useState } from 'react'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'

import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import appReducer from './reducers'
import { ThemeContext, StateContext } from './contexts'
import FooterBar from './pages/FooterBar'

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/view/:id': route(req => {
    return { view: <PostPage id={req.params.id} /> }
  }),
})

export default function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  });

  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const { user } = state;

  useEffect(() => {
    user ? document.title = `${user} - React Hooks Blog` : document.title = 'React Hooks Blog'
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <HeaderBar setTheme={setTheme} />
            <hr />
            <View />
            <FooterBar />
          </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}
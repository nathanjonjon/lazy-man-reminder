// src/App.js
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Auth, { useAuthActions } from "use-eazy-auth"
import { AuthRoute, GuestRoute } from "use-eazy-auth/routes"
import { ConfigureRj } from "react-rocketjump"
import { map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import Login from "./pages/Login"
import Todolist from "./pages/Todolist"
import Websocket from './Websocket'

const login = (credentials = {}) =>
  ajax({
    url: "/token/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  }).pipe(
    map(({ response }) => ({
      accessToken: response.access,
      refreshToken: response.refresh,
    }))
  )

const me = token =>
  ajax.getJSON("/me/", {
    Authorization: `Bearer ${token}`,
  })

const refresh = refreshToken =>
  ajax({
    url: "/token/refresh/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { refresh: refreshToken },
  }).pipe(
    map(({ response }) => ({
      refreshToken,
      accessToken: response.access,
    }))
  )

function ConfigureAuth({ children }) {
  const { callAuthApiObservable } = useAuthActions()
  return (
    <ConfigureRj effectCaller={callAuthApiObservable}>{children}</ConfigureRj>
  )
}



export default function App() {
  return (
    <Auth loginCall={login} meCall={me} refreshTokenCall={refresh}>
      <ConfigureAuth>
        <Router>
          <Switch>
            <GuestRoute path="/login" redirectTo="/">
              <Login />
            </GuestRoute>
            <AuthRoute path="/" exact redirectTo="/login">
              <Websocket />
              <Todolist />
            </AuthRoute>
          </Switch>
        </Router>
      </ConfigureAuth>
    </Auth>
  )
}
// src/pages/Login.js
import { useEffect, useState } from "react"
import { useAuthActions, useAuthState } from "use-eazy-auth"

export default function Login() {
    const { loginLoading, loginError } = useAuthState()
    const { login, clearLoginError } = useAuthActions()

    // Clear login error when Login component unmount
    useEffect(() => () => clearLoginError(), [clearLoginError])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form
            class="row mt-5 p-2 loginframe"
            onSubmit={e => {
                e.preventDefault()
                if (username !== "" && password !== "") {
                    login({ username, password })
                }
            }}
        >

            <div class="col-md-4 offset-md-4 justify-content-md-center">
                <div class="mb-3">
                    <h2 class="mt-4 auto">Wellcome to</h2>
                    <h1 class="title">Lazy Man Reminder</h1>
                    <h3 class="mt-4">Please enter your account.</h3>
                </div>
                <div class="form-group input">
                    <input
                        placeholder="@username"
                        class="input"
                        type="text"
                        value={username}
                        onChange={e => {
                            clearLoginError()
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div class="form-group input">
                    <input
                        placeholder="Password"
                        class="input"
                        type="password"
                        value={password}
                        onChange={e => {
                            clearLoginError()
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div class="col-md-3 offset-md-2 justify-content-md-center">
                    <button class="btn button btn-light" disabled={loginLoading}>
                    {!loginLoading ? "Log In" : "Logged in..."}
                </button>
                </div>
                {loginError && (
                    <div class="alert alert-danger mt-3">
                        Bad combination of username and password.
                    </div>
                )}
            </div>
        </form>
    )
}
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const accounts = JSON.parse(localStorage.getItem('learnly:accounts') || '[]')
    const account = accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password)
    if (!account) {
      setError('That email and password don’t match. Try again, or create an account.')
      return
    }
    onSignIn({ name: account.name, email: account.email })
    navigate(location.state?.from || '/my-learning', { replace: true })
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-decoration">✳</div>
        <span className="eyebrow">Lovely to see you again</span>
        <h1>Welcome<br />back<span>.</span></h1>
        <p className="auth-subtitle">Your next little win is waiting.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email address<input type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} /></label>
          <label>Password<input type="password" autoComplete="current-password" required placeholder="Your password" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark auth-submit" type="submit">Let’s get learning <span>↗</span></button>
        </form>
        <p className="auth-switch">New around here? <Link to="/register">Make an account</Link></p>
        <Link className="auth-back" to="/">← Back home</Link>
      </div>
      <div className="auth-aside auth-aside-login"><span className="auth-aside-flower">✿</span><blockquote>“It feels like learning with a friend who really gets it.”</blockquote><span className="quote-credit">— Jamie, learner since 2023</span><div className="auth-aside-dots">✳ &nbsp; ✿ &nbsp; ✳</div></div>
    </main>
  )
}

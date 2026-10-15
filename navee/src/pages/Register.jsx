import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register({ onSignIn }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const accounts = JSON.parse(localStorage.getItem('learnly:accounts') || '[]')
    if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('There’s already an account with that email. Try logging in instead.')
      return
    }
    const account = { name: name.trim(), email: email.trim().toLowerCase(), password }
    localStorage.setItem('learnly:accounts', JSON.stringify([...accounts, account]))
    onSignIn({ name: account.name, email: account.email })
    navigate('/my-learning', { replace: true })
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-decoration">✿</div>
        <span className="eyebrow">There’s room for you here</span>
        <h1>Start a little<br />something<span>.</span></h1>
        <p className="auth-subtitle">Make yourself at home. Your first lesson is just around the corner.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Your name<input type="text" autoComplete="name" required minLength="2" placeholder="What should we call you?" value={name} onChange={(event) => { setName(event.target.value); setError('') }} /></label>
          <label>Email address<input type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} /></label>
          <label>Password<input type="password" autoComplete="new-password" required minLength="6" placeholder="At least 6 characters" value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark auth-submit" type="submit">Create my account <span>↗</span></button>
        </form>
        <p className="auth-switch">Already learning with us? <Link to="/login">Log in</Link></p>
        <Link className="auth-back" to="/">← Back home</Link>
      </div>
      <div className="auth-aside auth-aside-register"><span className="auth-aside-flower">✳</span><blockquote>“You don’t have to see the whole staircase, just take the first step.”</blockquote><span className="quote-credit">A little encouragement to get you started</span><div className="auth-aside-dots">✿ &nbsp; ✳ &nbsp; ✿</div></div>
    </main>
  )
}

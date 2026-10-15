import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import MyLearning from './pages/MyLearning.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import './App.css'

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  const [user, setUser] = useState(() => readStorage('learnly:user', null))
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 3200)
    return () => window.clearTimeout(timer)
  }, [notice])

  const enrollmentsKey = user ? `learnly:enrollments:${user.email}` : null
  const [enrollments, setEnrollments] = useState(() =>
    user ? readStorage(`learnly:enrollments:${user.email}`, {}) : {},
  )

  useEffect(() => {
    if (enrollmentsKey) localStorage.setItem(enrollmentsKey, JSON.stringify(enrollments))
  }, [enrollments, enrollmentsKey])

  function signIn(account) {
    localStorage.setItem('learnly:user', JSON.stringify(account))
    setUser(account)
    setEnrollments(readStorage(`learnly:enrollments:${account.email}`, {}))
  }

  function signOut() {
    localStorage.removeItem('learnly:user')
    setUser(null)
    setEnrollments({})
    setNotice('You have been signed out.')
  }

  function enroll(courseId) {
    if (!user) return false
    setEnrollments((current) => ({
      ...current,
      [courseId]: current[courseId] || { completedLessons: [] },
    }))
    setNotice('You’re enrolled! Your learning journey starts now.')
    return true
  }

  function toggleLesson(courseId, lessonIndex) {
    setEnrollments((current) => {
      const course = current[courseId]
      if (!course) return current
      const completedLessons = course.completedLessons.includes(lessonIndex)
        ? course.completedLessons.filter((lesson) => lesson !== lessonIndex)
        : [...course.completedLessons, lessonIndex]
      return { ...current, [courseId]: { ...course, completedLessons } }
    })
  }

  return (
    <>
      <ScrollToTop />
      <Navbar user={user} onSignOut={signOut} />
      {notice && <div className="toast" role="status">{notice}</div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/courses/:courseId"
          element={
            <CourseDetails
              user={user}
              enrollments={enrollments}
              onEnroll={enroll}
              onToggleLesson={toggleLesson}
            />
          }
        />
        <Route path="/my-learning" element={<MyLearning user={user} enrollments={enrollments} />} />
        <Route path="/login" element={<Login onSignIn={signIn} />} />
        <Route path="/register" element={<Register onSignIn={signIn} />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="site-footer">
        <a className="brand footer-brand" href="/" aria-label="Navee home"><span className="brand-mark">N</span> navee<span className="brand-period">.</span></a>
        <span>Keep learning. Keep growing.</span>
        <span>© 2026 Navee Academy</span>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

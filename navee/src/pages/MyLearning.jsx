import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import { courses } from '../data/courses.js'

export default function MyLearning({ user, enrollments }) {
  if (!user) {
    return (
      <main className="page-wrap inner-page">
        <section className="page-intro learning-intro"><span className="eyebrow">Your very own learning space</span><h1>Little steps,<br /><span>big things.</span></h1><p>Sign in to see your courses, pick up where you left off, and celebrate how far you’ve come.</p><Link className="button button-dark" to="/login">Log in to continue <span>↗</span></Link></section>
        <section className="learning-empty"><span className="empty-illustration">✳</span><h2>Your next chapter starts here.</h2><p>Find a course that makes you curious and we’ll save your place.</p><Link className="text-link" to="/courses">Browse all courses <span>→</span></Link></section>
      </main>
    )
  }

  const myCourses = courses.filter((course) => enrollments[course.id])
  const completedCount = myCourses.filter((course) => enrollments[course.id].completedLessons.length === course.lessons).length

  return (
    <main className="page-wrap inner-page">
      <section className="learning-welcome"><div><span className="eyebrow">Welcome back, {user.name.split(' ')[0]}</span><h1>Your learning<br /><span>looks good on you.</span></h1><p>Every lesson is a little win. Keep going, you’re doing great.</p></div><div className="learning-stat"><span>✿</span><strong>{myCourses.length}</strong><small>{myCourses.length === 1 ? 'course in progress' : 'courses in your corner'}</small></div></section>
      <section className="my-courses-section">
        <div className="section-heading"><div><span className="eyebrow">Pick up where you left off</span><h2>Your courses <span className="heading-count">{myCourses.length}</span></h2></div><Link className="text-link" to="/courses">Find something new <span>→</span></Link></div>
        {myCourses.length ? <div className="course-grid">{myCourses.map((course) => {
          const progress = Math.round((enrollments[course.id].completedLessons.length / course.lessons) * 100)
          return <CourseCard key={course.id} course={course} progress={progress} />
        })}</div> : <div className="learning-empty compact-empty"><span className="empty-illustration">✳</span><h2>A fresh start is a lovely thing.</h2><p>You haven’t enrolled in a course yet. Your first lesson is waiting.</p><Link className="button button-dark" to="/courses">Find your first course <span>↗</span></Link></div>}
        {myCourses.length > 0 && <div className="learning-footer-note"><span>✿</span> You’ve completed {completedCount} {completedCount === 1 ? 'course' : 'courses'}. Every little win counts.</div>}
      </section>
    </main>
  )
}

import { Link, useNavigate, useParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import { courses } from '../data/courses.js'

export default function CourseDetails({ user, enrollments, onEnroll, onToggleLesson }) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return <main className="page-wrap inner-page"><div className="empty-state"><span>✳</span><h1>That course wandered off</h1><Link className="button button-dark" to="/courses">Browse courses</Link></div></main>
  }

  const enrollment = enrollments[course.id]
  const completedLessons = enrollment?.completedLessons || []
  const progress = Math.round((completedLessons.length / course.lessons) * 100)
  const related = courses.filter((item) => item.id !== course.id && item.category === course.category).slice(0, 2)

  function handleEnroll() {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${course.id}` } })
      return
    }
    onEnroll(course.id)
  }

  return (
    <main className="page-wrap inner-page detail-page">
      <div className="breadcrumb"><Link to="/courses">Courses</Link><span>/</span><span>{course.category}</span><span>/</span><span>{course.title}</span></div>
      <div className="detail-layout">
        <div className="detail-main">
          <span className="eyebrow">{course.category} · {course.level}</span>
          <h1>{course.title}</h1>
          <p className="detail-lede">{course.description}</p>
          <div className={`detail-image course-image-${course.color}`}><img src={course.image} alt="" /><span className="detail-image-sticker">A little learning<br />goes a long way ✳</span></div>
          <section className="detail-section"><span className="eyebrow">A little about this course</span><h2>Make something meaningful.</h2><p>{course.description} Each lesson is short, practical, and made to fit into your life. Come as you are and leave with something you’re proud of.</p></section>
          <section className="detail-section learn-section"><span className="eyebrow">By the end, you’ll be able to</span><h2>Good things you’ll take away</h2><ul className="takeaway-list">{course.topics.map((topic) => <li key={topic}><span>✓</span>{topic}</li>)}</ul></section>
          <section className="detail-section lesson-section">
            <div className="lesson-heading"><div><span className="eyebrow">One step at a time</span><h2>What’s inside</h2></div><span>{course.lessons} lessons · {course.duration}</span></div>
            <div className="lesson-list">{course.lessonTitles.map((lesson, index) => {
              const isComplete = completedLessons.includes(index)
              return (
                <div className={`lesson-row ${isComplete ? 'lesson-complete' : ''}`} key={lesson}>
                  <span className="lesson-number">{isComplete ? '✓' : String(index + 1).padStart(2, '0')}</span>
                  <span className="lesson-title">{lesson}</span>
                  {enrollment ? <button className="lesson-check" aria-label={`${isComplete ? 'Mark' : 'Complete'} ${lesson}`} onClick={() => onToggleLesson(course.id, index)}>{isComplete ? 'Completed' : 'Mark complete'}</button> : <span className="lesson-duration">↗</span>}
                </div>
              )
            })}</div>
          </section>
        </div>
        <aside className="enroll-card">
          <div className={`enroll-card-image course-image-${course.color}`}><img src={course.image} alt="" /></div>
          <div className="enroll-card-body">
            <span className="eyebrow">Your next little adventure</span>
            <div className="enroll-price">₹{course.price.toLocaleString('en-IN')}<span> / month</span></div>
            {enrollment ? <div className="enrolled-state"><span>✳</span><strong>You’re in!</strong><small>{progress === 100 ? 'Course complete. Look at you go!' : `${progress}% complete · keep it up!`}</small></div> : <button className="button button-dark enroll-button" onClick={handleEnroll}>Start learning <span>↗</span></button>}
            <ul className="enroll-includes"><li>✓ {course.lessons} easy-to-follow lessons</li><li>✓ Learn at your own pace</li><li>✓ Keep your progress forever</li><li>✓ A certificate to celebrate</li></ul>
            <div className="instructor-card"><div className="instructor-avatar">{course.instructor.split(' ').map((part) => part[0]).join('')}</div><div><small>Your instructor</small><strong>{course.instructor}</strong><span>{course.role}</span></div></div>
            <div className="detail-rating">★ {course.rating} <span>· {course.students} learners</span></div>
          </div>
        </aside>
      </div>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><span className="eyebrow">If you like this, you might love</span><h2>A little more to explore</h2></div><Link className="text-link" to="/courses">All courses <span>→</span></Link></div><div className="course-grid">{related.map((item) => <CourseCard key={item.id} course={item} />)}</div></section>}
    </main>
  )
}

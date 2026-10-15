import { Link } from 'react-router-dom'

export default function CourseCard({ course, progress }) {
  return (
    <article className="course-card">
      <Link className={`course-image course-image-${course.color}`} to={`/courses/${course.id}`} aria-label={`View ${course.title}`}>
        <img src={course.image} alt="" loading="lazy" />
        <span className="course-category">{course.category}</span>
        {progress !== undefined && <span className="learning-badge">In progress</span>}
      </Link>
      <div className="course-card-content">
        <div className="course-meta"><span>★ {course.rating}</span><span>{course.duration}</span></div>
        <h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3>
        <p className="course-instructor">with {course.instructor}</p>
        {progress !== undefined && (
          <div className="card-progress">
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <span>{progress}%</span>
          </div>
        )}
        <div className="course-card-bottom">
          <span className="course-price">₹{course.price.toLocaleString('en-IN')} <small>/ month</small></span>
          <Link className="course-arrow" to={`/courses/${course.id}`} aria-label={`Open ${course.title}`}>↗</Link>
        </div>
      </div>
    </article>
  )
}

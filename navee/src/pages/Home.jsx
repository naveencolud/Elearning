import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import { courses } from '../data/courses.js'

const categories = [
  { icon: '✳', name: 'Design', tone: 'category-lilac' },
  { icon: '⌘', name: 'Development', tone: 'category-peach' },
  { icon: '↗', name: 'Business', tone: 'category-green' },
  { icon: '◉', name: 'Photography', tone: 'category-yellow' },
]

export default function Home() {
  return (
    <main>
      <section className="hero-section page-wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-spark">✳</span> A little learning goes a long way</span>
          <h1>Make room for<br />your <span>next thing.</span></h1>
          <p className="hero-description">Good things happen when you stay curious. Find a course you love, learn at your own pace, and see where it takes you.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/courses">Find your course <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/my-learning">Your learning space <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>J</span><span>A</span><span>M</span><span>K</span></div>
            <div><strong>12,000+ curious minds</strong><small>learning something new every day</small></div>
          </div>
        </div>
        <div className="hero-art">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90" alt="A learner working through an online course at home" />
          <div className="hero-note"><span className="note-icon">✿</span><div><strong>Little steps add up</strong><small>Just 20 minutes a day</small></div></div>
          <div className="hero-sticker">Learn<br />your way <span>↗</span></div>
          <span className="hero-doodle" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="category-section">
        <div className="page-wrap">
          <div className="section-heading compact-heading"><div><span className="eyebrow">A good place to start</span><h2>What are you curious about?</h2></div><Link className="text-link" to="/courses">All topics <span>→</span></Link></div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link className={`category-tile ${category.tone}`} key={category.name} to={`/courses?category=${category.name}`}>
                <span className="category-icon">{category.icon}</span><span className="category-name">{category.name}</span><span className="category-count">{courses.filter((course) => course.category === category.name).length} courses</span><span className="category-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section page-wrap">
        <div className="section-heading"><div><span className="eyebrow">Handpicked for your curious mind</span><h2>Courses to fall into</h2></div><Link className="text-link" to="/courses">Explore all courses <span>→</span></Link></div>
        <div className="course-grid">
          {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      </section>

      <section className="quote-section page-wrap">
        <div className="quote-mark">“</div>
        <blockquote>Learning isn't about having it all figured out. It's about being curious enough to take the first step.</blockquote>
        <span className="quote-credit">A little reminder from us to you</span>
        <Link className="button button-light" to="/courses">Take that first step <span>↗</span></Link>
        <span className="quote-flower" aria-hidden="true"></span>
      </section>
    </main>
  )
}

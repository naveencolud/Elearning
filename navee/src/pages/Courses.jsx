import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import { categories, courses } from '../data/courses.js'

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const category = searchParams.get('category') || 'All courses'

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesCategory = category === 'All courses' || course.category === category
      const matchesSearch = !query || `${course.title} ${course.category} ${course.instructor} ${course.description}`.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  function selectCategory(value) {
    const params = new URLSearchParams(searchParams)
    if (value === 'All courses') params.delete('category')
    else params.set('category', value)
    setSearchParams(params)
  }

  return (
    <main className="page-wrap inner-page">
      <section className="page-intro">
        <span className="eyebrow">Find your next favorite thing</span>
        <h1>Courses for your<br /><span>curious side.</span></h1>
        <p>No pressure, no prerequisites. Just thoughtful courses and lovely people to learn from.</p>
      </section>
      <section className="catalog-section" aria-label="Browse courses">
        <div className="catalog-toolbar">
          <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="What would you love to learn?" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search courses" /><kbd>↵</kbd></label>
          <span className="results-count">{filteredCourses.length} lovely {filteredCourses.length === 1 ? 'course' : 'courses'}</span>
        </div>
        <div className="filter-list" aria-label="Filter by category">
          {categories.map((item) => <button key={item} className={`filter-chip ${category === item ? 'filter-chip-active' : ''}`} onClick={() => selectCategory(item)}>{item}</button>)}
        </div>
        {filteredCourses.length > 0 ? (
          <div className="course-grid">
            {filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <div className="empty-state"><span>✳</span><h2>No courses found just yet</h2><p>Try another search or explore all our courses.</p><button className="button button-dark" onClick={() => { setSearch(''); selectCategory('All courses') }}>Show me everything</button></div>
        )}
      </section>
    </main>
  )
}

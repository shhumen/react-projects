import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const newJobs = await response.json()

      setLoading(false)
      setJobs(newJobs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    )
  }

  const { company, title, dates, duties } = jobs[value]

  return (
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>

      <div className='jobs-center'>
        {/* button container */}

        <div className='btn-container'>
          {jobs.map((item, index) => {
            return (
              <button
                className={`job-btn ${index === value && 'active-btn'}`}
                onClick={() => setValue(index)}
                key={item.id}
              >
                {item.company}
              </button>
            )
          })}
        </div>

        {/* job info */}

        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='date'>{dates}</p>

          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon' /> <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App

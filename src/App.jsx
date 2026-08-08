import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backendMessage, setBackendMessage] = useState('Loading backend...')
  const [questions, setQuestions] = useState([])
  const [selectedQuestionId, setSelectedQuestionId] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    let mounted = true
    axios
      .get('/api/interviews/questions')
      .then((res) => {
        const data = res.data
        if (!mounted) return
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions)
          setBackendMessage('Questions loaded')
          setSelectedQuestionId(String(data.questions[0].id || ''))
        } else if (data.message) {
          setBackendMessage(data.message)
        } else {
          setBackendMessage('Backend responded successfully.')
        }
      })
      .catch(() => {
        setBackendMessage('Unable to reach backend.')
      })

    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const payload = { questionId: selectedQuestionId, answer }
      const res = await axios.post('/api/interviews/answer', payload)
      if (res.status === 201 || res.status === 200) {
        setStatus('Answer submitted successfully.')
        setAnswer('')
      } else {
        setStatus('Submission completed with status: ' + res.status)
      }
    } catch (err) {
      console.error(err)
      setStatus('Failed to submit answer.')
    }
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo-row">
          <img src={reactLogo} alt="React" className="small-logo" />
          <h1>AI Interview Prep</h1>
          <img src={viteLogo} alt="Vite" className="small-logo" />
        </div>
        <p className="subtitle">Practice questions, get feedback, improve your skills.</p>
      </header>

      <main className="container">
        <section className="left">
          <div className="hero-card">
            <img src={heroImg} alt="hero" className="hero-img" />
            <div>
              <h2>Get started</h2>
              <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
              <p className="backend-status">Backend: {backendMessage}</p>
              <button className="counter" onClick={() => setCount((c) => c + 1)}>
                Count is {count}
              </button>
            </div>
          </div>

          <div className="questions-list">
            <h3>Available Questions</h3>
            {questions.length > 0 ? (
              <ul>
                {questions.map((q) => (
                  <li key={q.id}>
                    <strong>{q.id}.</strong> {q.questionText}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No questions available. {backendMessage}</p>
            )}
          </div>
        </section>

        <aside className="right">
          <h3>Answer a question</h3>
          <form onSubmit={handleSubmit} className="answer-form">
            <label>
              Question
              <select value={selectedQuestionId} onChange={(e) => setSelectedQuestionId(e.target.value)}>
                <option value="">-- Select --</option>
                {questions.map((q) => (
                  <option key={q.id} value={q.id}>{q.id}: {q.questionText.substring(0, 60)}...</option>
                ))}
              </select>
            </label>

            <label>
              Your Answer
              <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={6} />
            </label>

            <div className="form-actions">
              <button type="submit" className="primary">Submit Answer</button>
              <button type="button" onClick={() => { setAnswer(''); setStatus('') }} className="secondary">Clear</button>
            </div>

            {status && <p className="status">{status}</p>}
          </form>

          <div className="links">
            <a href="https://react.dev/" target="_blank">Learn React</a>
            <a href="https://vite.dev/" target="_blank">Vite Docs</a>
          </div>
        </aside>
      </main>

      <footer className="app-footer">
        <p>AI Interview Preparation Platform</p>
      </footer>
    </div>
  )
}

export default App

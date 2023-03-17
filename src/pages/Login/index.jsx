import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './login.module.css'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {

    e.preventDefault()

    if(email !== '' && password !== '') {
      alert('test')
    } else {
      alert('error login')
    }

  }

  return (
    <div className={styles.container}>
      <h1>To Do List</h1>
      <span>Manage your tasks!</span>

      <form className={styles.formLogin} onSubmit={login}>

        <input 
          type="text" 
          placeholder='Email...' 
          value={email}
          onChange={e => setEmail(e.target.value)} />
        <input 
          type="password" 
          placeholder='Password...' 
          value={password}
          onChange={e => setPassword(e.target.value)} />

          <button type='submit'>Login</button>

      </form>

      <Link className={styles.link} to="/register">
        Don't have an account? Register!
      </Link>

    </div>
  )
}

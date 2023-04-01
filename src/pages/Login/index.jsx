import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = e => {

    e.preventDefault()

    if(email !== '' && password !== '') {
      
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home', { replace: true })
      })
      .catch(e => console.log(e))

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

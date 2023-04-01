import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.css'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = e => {

    e.preventDefault()

    if(email !== '' && password !== '') {
      
      createUserWithEmailAndPassword(auth, email, password)
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
      <span>Register!</span>

      <form className={styles.formRegister} onSubmit={register}>

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

          <button type='submit'>Register</button>

      </form>

      <Link className={styles.link} to="/">
        Already have an account? Login!
      </Link>

    </div>
  )
}

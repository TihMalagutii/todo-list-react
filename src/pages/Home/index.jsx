import { useState } from 'react'
import { BsFillPencilFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import styles from './home.module.css'

export default function Home() {

  const [taskInput, setTaskInput] = useState('')

  const addTask = e => {
    e.preventDefault()
    alert('clicou')
  }

  const logout = () => {
    signOut(auth)
  }

  return (
    <div className={styles.container}>

      <h1>My tasks</h1>

      <form onSubmit={addTask}>
        <input
          placeholder='type a task...'
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
        />
        <button type='submit'>Add task</button>
      </form>

      <div className={styles.list}>

        <article>
          <p>task 1</p>
          <div>
            <button className={styles.btnEdit}><BsFillPencilFill /></button>
            <button className={styles.btnConclude}><BsFillCheckCircleFill /></button>
          </div>
        </article>

      </div>

      <button className={styles.btnLogout} onClick={logout}><FiLogOut /></button>

    </div>
  )
}

import { useState } from 'react'
import { BsPencil, BsCheckLg, BsPlusLg, BsSave } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import styles from './home.module.css'
import { useEffect } from 'react'

export default function Home() {

  const [taskInput, setTaskInput] = useState('')
  const [user, setUser] = useState({})
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(() => {
    const loadTasks = () => {
      const detailUser = localStorage.getItem("@detailUser")
      setUser(JSON.parse(detailUser))

      if(detailUser){
        const data = JSON.parse(detailUser)
        const taskRef = collection(db, "tasks")
        const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {

          let list = []
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              task: doc.data().task,
              userUid: doc.data().userUid
            })
          })

          setTasks(list)

        })

      }

    }
    loadTasks()
  }, [])

  const addTask = e => {

    e.preventDefault()

    if(taskInput === ''){
      alert("Enter a task...")
      return
    }

    if(edit?.id) {
      updateTask()
      return
    }

    addDoc(collection(db, "tasks"), {
      task: taskInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      console.log("Successfully registered task!")
      setTaskInput('')
    })
    .catch(e => console.log(e))

  }

  const concludeTask = id => {

    const docRef = doc(db, "tasks", id)

    let confirm = window.confirm("Do you really want to delete this task?")
    if(confirm == true) {
      deleteDoc(docRef)
    }
    
  }

  const editTask = item => {
    
    setTaskInput(item.task)
    setEdit(item)

  }

  const updateTask = () => {

    const docRef = doc(db, "tasks", edit?.id)
    updateDoc(docRef, {
      task: taskInput,
      created: new Date()
    })
    .then(() => {
      console.log("Updated task!")
      setTaskInput('')
      setEdit({})
    })
    .catch(e => {
      console.log(e)
      setTaskInput('')
      setEdit({})
    })

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

        {Object.keys(edit).length > 0 ? (
          <button type='submit' className={styles.btnSave}><BsSave /></button>
        ) : (
          <button type='submit' className={styles.btnPlus}><BsPlusLg /></button>
        )}
        
      </form>

      <div className={styles.list}>

        {tasks.map(item => (
          <article key={item.id}>
            <p>{item.task}</p>
            <div>
              <button className={styles.btnEdit} onClick={() => editTask(item)}><BsPencil /></button>
              <button className={styles.btnConclude} onClick={() => concludeTask(item.id)}><BsCheckLg /></button>
            </div>
          </article>
        ))}

      </div>

      <button className={styles.btnLogout} onClick={logout}><FiLogOut /></button>

    </div>
  )
}

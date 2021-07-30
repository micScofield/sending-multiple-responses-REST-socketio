import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { connect } from './socket-client'

function App() {
  let socket
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket = connect()
    socket.on('user-data', userData => {
      console.log('Received Event', userData)
      setUserData(userData)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  async function getUsersHandler(e) {
    e.preventDefault()
    setLoading(true)
    const users = await axios.get('http://localhost:5000')
    console.log(users)
    setLoading(false)
  }

  return (
    <div>
      <button onClick={(e) => getUsersHandler(e)}>Get Users</button>
      {loading && <div>Loading</div>}

      <Dashboard />

      <br />
      {userData.map(user => {
        return <p key={user.name}>{user.name}</p>
      })}
    </div>
  )
}

export default App


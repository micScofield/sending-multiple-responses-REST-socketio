import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from '../socket-client'

function Dashboard() {
  let socket
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket = connect()
    socket.on('user-signup', userData => {
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
    const users = await axios.get('http://localhost:5000/signup')
    console.log(users)
    setLoading(false)
  }

  userData.length !== 0 && console.log(userData)

  return (
    <div>
      <button onClick={(e) => getUsersHandler(e)}>Dashboard</button>
      {loading && <div>Loading</div>}

      <br />
      {userData.length !== 0 && userData.map(user => {
        return <p key={user.name}>D: {user.name}</p>
      })}
    </div>
  )
}

export default Dashboard


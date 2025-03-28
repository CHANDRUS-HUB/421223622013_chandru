import React from 'react'
import User from './user.jsx'
function App() {
  const user = {
    name: 'john',
    age: 25,
    occupation: 'software engineer'
  }


  return (
    <div>
      <User
        name={user.name}
        age={user.age}
        occupation={user.occupation}
      />
    </div>
  )
}

export default App
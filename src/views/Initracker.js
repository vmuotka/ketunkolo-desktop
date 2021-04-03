import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'

import TrackerCard from '../components/TrackerCard'
import Button from '../components/Button'
import Input from '../components/Input'
import initrackerService from '../services/initrackerService'

const socket = io.connect('https://vmuotka-ketunkolo.herokuapp.com')

const Initracker = () => {
  const [combat, setCombat] = useState([])
  const [roomname, setRoomname] = useState(undefined)
  const [roomnameForm, setRoomnameForm] = useState('')
  const [units, setUnits] = useState([])
  const [characterForm, setCharacterForm] = useState({ name: '', initiative: 10 })
  const [showCharacterForm, setShowCharacterForm] = useState(false)
  useEffect(() => {
    if (roomname) {
      socket.emit('joinroom', { roomname })
      socket.on('host-update-combat', data => {
        setCombat(data.combat)
      })
    }
  }, [setCombat, roomname])

  const addPC = (e) => {
    e.preventDefault()
    if (characterForm.name.length > 0) {
      initrackerService.addPc({ ...characterForm, roomname })
      setUnits([...units, characterForm.name])
      setCharacterForm({ name: '', initiative: 10 })
    }
  }

  const handlecharacterFormChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setCharacterForm({
      ...characterForm,
      [name]: value
    })
  }

  const handleRoomname = (e) => {
    e.preventDefault()
    setRoomname(roomnameForm)
    setRoomnameForm('')
  }

  const leaveRoom = () => {
    setRoomname(undefined)
    setUnits([])
  }

  return (
    <>
      {!roomname &&
        <form onSubmit={handleRoomname} className='flex flex-col w-full h-screen justify-center items-center overflow-hidden'>
          <div className='text-xl text-primary-700'>Roomname</div>
          <Input type='text' value={roomnameForm} onChange={(e) => setRoomnameForm(e.target.value)} placeholder="Host's username" />
        </form>
      }
      {roomname && <>
        <div className='flex justify-center gap-2 my-4'>
          <Button value={showCharacterForm ? 'Hide Form' : 'Show Form'} onClick={() => { setShowCharacterForm(!showCharacterForm) }} />
          <Button value='Leave room' onClick={leaveRoom} />
        </div>
        {showCharacterForm &&
          <form onSubmit={addPC}>
            <Input type='text' value={characterForm.name} name='name' onChange={handlecharacterFormChange} label='Name' />
            <Input type='number' value={characterForm.initiative} name='initiative' onChange={handlecharacterFormChange} label='Initiative' />
            <input className='my-2 mx-4 block bg-secondary-400 hover:bg-secondary-500 text-white px-2 py-1 rounded' type='submit' value='Add PC' />
          </form>
        }
        <div className='my-4 flex flex-col gap-2'>
          {
            combat.map(creature => <TrackerCard key={creature.id} creature={creature} roomname={roomname} disabled={!units.includes(creature.name)} />)
          }
        </div>
      </>}
    </>
  )
}

export default Initracker
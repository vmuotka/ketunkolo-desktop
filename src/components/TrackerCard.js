import { useState, useEffect } from 'react'
import Input from './Input'
import initrackerService from '../services/initrackerService'

const TrackerCard = ({ creature, roomname, disabled }) => {
  const [initiative, setInitiative] = useState(creature.initiative)
  useEffect(() => {
    setInitiative(creature.initiative)
  }, [creature])
  const updateInitiative = () => {
    console.log('ree')
    initrackerService.addPc({ ...creature, initiative, roomname })
  }
  let bg
  if (!disabled)
    bg = 'bg-blue-600 border-blue-700'
  else if (creature.statblock)
    bg = 'bg-red-600 border-red-700'
  else
    bg = 'bg-green-600 border-green-700'

  console.log(creature)
  return (
    <div className={`border-4 p-4 ${bg} text-white`}>
      <div className='text-lg b'>{creature.name}</div>
      <div className='flex flex-wrap gap-2'>
        <Input type='number' value={initiative} onChange={(e) => setInitiative(e.target.value)} onBlur={updateInitiative} label='Initiative' disabled={disabled} />
        {creature.hp && <Input type='number' value={creature.hp.filter(hp => hp > 0).length} label='Count' disabled />}
      </div>
    </div>
  )
}

export default TrackerCard
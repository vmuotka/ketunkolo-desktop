import axios from 'axios'
const baseUrl = 'https://vmuotka-ketunkolo.herokuapp.com/api/initracker'

const addPc = (data) => {
  axios.get(`${baseUrl}/initiative?roomname=${data.roomname}&character=${data.name}&initiative=${data.initiative}`)
}

export default { addPc }
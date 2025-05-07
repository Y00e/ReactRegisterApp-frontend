import React, {useEffect, useState} from 'react'
import { deletPlayer, listPlayers } from '../services/PlayerService'
import { useNavigate } from 'react-router-dom'
const ListPlayerComponent = () => {
  
  const [players, setPlayers] = useState([])
  const navigator = useNavigate();
  
  useEffect(() => {
    getAllPlayers();
  }, [])

  function getAllPlayers() {
    listPlayers().then((response) => {
      setPlayers(response.data)
    }).catch(error => {
      console.error(error);
    })
  }

  function addNewPlayer(){
    navigator('/add-player')
  }
  
  function updatePlayer(id) {
    navigator(`/edit-player/${id}`)
  }

  function removePlayer(id){
    console.log(id);

    deletPlayer(id).then((response) => {
      getAllPlayers();
    }).catch(error => {
      console.error(error);
    })
  }
  
  return (
    <div className='container'>
      <h2 className='text-center'>List of Players</h2>
      <button className='btn btn-primary mb-2' onClick={addNewPlayer}>Add Player</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Player Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            players.map(player => 
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.birthday}</td>
                <td>{player.phoneNumber}</td>
                <td>{player.email}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updatePlayer(player.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removePlayer(player.id)}
                    style={{marginLeft: '10px'}}
                  >Delete</button>
                </td>
              </tr>
            )
          }
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListPlayerComponent


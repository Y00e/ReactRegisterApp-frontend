import React, { useEffect, useState } from 'react'
import { createplayer, getPlayer, updatePlayer } from '../services/PlayerService';
import { useNavigate, useParams } from 'react-router-dom';

const PlayerComponent = () => {

  const [firstName,setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');

  const {id} = useParams();
  // state för hålla valideringsfel 
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    // om id finns hämtar den från API  och fyller i formuläret
    if(id){
      getPlayer(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setBirthday(response.data.birthday);
      }).catch(error => {
        console.error(error);
      })
    }

  }, [id])

  // hanterar när formuläret skickas in
  function saveOrUpdatePlayer(e){
    e.preventDefault();

    if(validateForm()){

      const player = {firstName, lastName, email, phoneNumber, birthday}
      console.log(player)

      // om spelare finns, updatera spelaren, annars skapa en ny
      if(id){
        updatePlayer(id, player).then((response) => {
          console.log(response.data);
          navigator('/players');
        }).catch(error => {
          console.error(error);
        })
      } else {
        createplayer(player).then((response) => {
          console.log(response.data);
          navigator('/players')
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  // validerar formuläret
  function validateForm(){
    let valid = true;

    // kopierar errors
    const errorsCopy = {... errors}

    // kontrollerar varje fält och sätt felmeddelande om det är tomt 
    if(firstName.trim()){
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if(lastName.trim()){
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if(email.trim()){
      errorsCopy.email = '';
    } else {
      errorsCopy.email = ' email is required'
      valid = false;
    }

    if(phoneNumber.trim()){
      errorsCopy.phoneNumber = '';
    } else {
      errorsCopy.phoneNumber = ' Phone number is required'
      valid = false;
    }
    
    if(birthday.trim()){
      errorsCopy.birthday = '';
    } else {
      errorsCopy.birthday = ' Birthday is required'
      valid = false;
    }

    // updatera error
    setErrors(errorsCopy);
    // returnera om det är giltigt
    return valid;
  }

  // funktiom för att visa rätt sidtitel beronde på om vi lägger till eller uppdaterar 
  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Update Basketball Player</h2>
    } else {
      return <h2 className='text-center'>Add Basketball Player</h2>
    }
  }

  
  // renderar komponenter 
  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Player First Name'
                  name='firstname'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid': ''} `}
                  onChange={(e) => setFirstName(e.target.value)}
                >
                </input>
                {errors.firstName  && <div className='invalid-feedback'> { errors.firstName} </div> }
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Player Last Name'
                  name='lastname'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid': ''} `}
                  onChange={(e) => setLastName(e.target.value)}
                >
                </input>
                {errors.lastName  && <div className='invalid-feedback'> { errors.lastName} </div> }
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid': ''} `}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </input>
                {errors.email  && <div className='invalid-feedback'> { errors.email} </div> }
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Phone Number:</label>
                <input
                  type='text'
                  placeholder='Enter Phone Number'
                  name='phoneNumber'
                  value={phoneNumber}
                  className={`form-control ${errors.phoneNumber ? 'is-invalid': ''} `}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                >
                </input>
                {errors.phoneNumber  && <div className='invalid-feedback'> { errors.phoneNumber} </div> }
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Birthday:</label>
                <input
                  type='text'
                  placeholder='Enter Birthday'
                  name='birthday'
                  value={birthday}
                  className={`form-control ${errors.birthday ? 'is-invalid': ''} `}
                  onChange={(e) => setBirthday(e.target.value)}
                >
                </input>
                {errors.birthday  && <div className='invalid-feedback'> { errors.birthday} </div> }
              </div>

              <button className='btn btn-success' onClick={saveOrUpdatePlayer}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerComponent
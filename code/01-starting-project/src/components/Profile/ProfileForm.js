import { useRef, useContext } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const API_KEY = 'AIzaSyBGGEIGiGq5Q96LcoyboWin0vZZRY67xuo'

const ProfileForm = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const newPasswordInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res)
      // assumption: Always succeeds
      history.replace('/')
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordInputRef} type='password' id='new-password' minLength="7" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

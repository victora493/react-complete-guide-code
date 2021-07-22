import classes from './Header.module.css';
import { useSelector, useDispatch  } from 'react-redux';
import { authActions } from '../store/auth-slice'

const Header = () => {
  const isAuthenticated = useSelector(({auth}) => auth.isAuthenticated)
  const dispatch = useDispatch()

  function onLogout() {
    dispatch(authActions.logout())
  }

  function renderNav() {
    if(!isAuthenticated) return
    return (
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {renderNav()}
    </header>
  );
};

export default Header;

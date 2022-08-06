import { Fragment } from 'react';
import { Outlet,Link } from 'react-router-dom';
import { ReactComponent as BeyondLogo } from '../../assets/image2vector.svg';
import './navigation.styles.scss'



const Navigation = () => {
    return(
      <Fragment>
        <div className="navigation">
            <Link className='logo-container' to='/'>
              <BeyondLogo className='logo'/>
            </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
              SHOP
            </Link>
            <Link className='signIn-link' to='/sign-in'>
              SIGN IN
            </Link>
            
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )

};

export default Navigation;
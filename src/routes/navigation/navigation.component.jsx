import { Fragment,useContext } from 'react';
import { Outlet,Link } from 'react-router-dom';

import { UserContext } from '../../context/user.context';

import { ReactComponent as BeyondLogo } from '../../assets/image2vector.svg';
import './navigation.styles.scss';



const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
            { currentUser ? (
                <span className='nav-link'>SIGN OUT</span>
              ): (
                  <Link className='nav-link' to='/auth'>
                  SIGN IN
                  </Link>             
            )}
            {/* <Link className='signIn-link' to='/auth'>
              SIGN IN
            </Link> */}
            
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )

};

export default Navigation;
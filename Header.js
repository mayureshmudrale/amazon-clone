import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() {
    const [{basket,user} , dispatch]= useStateValue();

    const handleAuthentication=() =>{
        if(user){
            auth.signOut();
        }

    }
    return (
        <div className="header">
            <Link to='/'> 
            <img className="header__logo" src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"/>
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text"></input>
                <SearchIcon className='header__searchIcon'/>
            </div>
            <div className="header__nav">
                <Link to={!user && '/login'}>
                     <div onClick={handleAuthentication} className="header__options">
               
                        <span className="header__optionLineOne">
                            Hello {user?.email}
                        </span>
                        <span className="header__optionLineTwo">{user?'Sign Out':'Sign IN'}
                            
                        </span>
                        
                    </div>
                </Link>

            <Link to='/orders'>
            <div className="header__options">
                <span className="header__optionLineOne">
                    Returns
                </span>
                <span className="header__optionLineTwo">
                    & Orders
                </span>
            </div>
            </Link>
            <div className="header__options">
                <span className="header__optionLineOne">
                    Your Prime
                </span>
                <span className="header__optionLineTwo">
                Prime
                </span>
            </div>
            </div>

            <Link to='/checkout'>
            <div className="header__optionsBasket">
           
            <ShoppingBasketIcon/>
            
            
            <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
            </span>
            </div>
            </Link>
            
        </div>
    )
}

export default Header

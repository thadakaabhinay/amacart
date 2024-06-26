import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Cart from "../Cart"
import SearchBox from "../UI/Search"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../actions/auth"


const Header = () => {
    const history=useHistory()
    const authState=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        dispatch(logout())
    }


    return (
        <header>
            <div className="nav-brand">
                <NavLink to="/">
                    <span>AmaKart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30"
                        height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                </NavLink>
            </div>
            <div className="searchBox-container">
                <SearchBox/>
            </div>
            {
                authState && authState.idToken ?
                <div className="user-actions">
                    <button><span  title="User Profile" className="material-symbols-outlined">account_circle</span></button>
                    {/* <button title="User Profile" className="material-icons">account_circle</button> */}
                    <button onClick={logoutHandler}><span title="logout" className="material-symbols-outlined">logout</span></button>
                    {/* <button title="logout" className="material-icons">logout</button> */}
                </div>
                :
                <button className="login-btn" onClick={()=>history.push("/login")}>Login</button>
            }
            
            <div className="cart-container">
                <Cart />
            </div>
        </header >
    )
}

export default Header
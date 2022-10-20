import React, { useEffect, useState } from 'react'
import './NavBar.css'
import logo from '../asset/Logo.svg';
import avatar from '../asset/Netflix-avatar.png'
const NavBar = () => {
    const navList = ["Start", "Show", "Movies", "New", "My List"]
    const [navbar, setNavbar] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {

            if (window.scrollY >= 100) {
                setNavbar(true)
            } else {
                setNavbar(false)
            }
        })
    })


    return (
        <div className={`nav ${navbar ? "navBack" : ""}`}>
            <div className='navFirst'>
                <img className='navLogo' src={logo} alt="logo" />
                <ul className='navList'>
                    {
                        navList.map((nav) => (
                            <li key={nav}>{nav}</li>
                        ))
                    }
                </ul>

            </div>
            <div>
                <img className='navAvatar' src={avatar} alt="avatar" />
            </div>
        </div >
    )
}

export default NavBar
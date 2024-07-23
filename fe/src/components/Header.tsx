import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div><header className="bg-gray-500 sticky top-0 z-50 px-4">
    <div className="container mx-auto flex justify-between items-center py-4">
    
      <div className="flex items-center">
        <img src="https://spacema-dev.com/blue-star/assets/images/blue-logo.png" alt="Logo" className="h-14 w-auto mr-4"/>
      </div>

       
      <div className="flex md:hidden">
        <button id="hamburger" className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      <nav className="hidden md:flex md:flex-grow justify-center">
        <ul className="flex justify-center space-x-4 text-white">
          <li><a href="#home" className="hover:text-secondary font-bold">Home</a></li>
          <li><a href="#aboutus" className="hover:text-secondary font-bold">About us</a></li>
          <li><a href="#results" className="hover:text-secondary font-bold">Results</a></li>
          <li><a href="#reviews" className="hover:text-secondary font-bold">Reviews</a></li>
          <li><a href="#portfolio" className="hover:text-secondary font-bold">Portfolio</a></li>
          <li><a href="#team" className="hover:text-secondary font-bold">Team</a></li>
          <li><a href="#contact" className="hover:text-secondary font-bold">Contact</a></li>
        </ul>
      </nav>

      <div className="hidden lg:flex items-center space-x-4">
        <a href="#" className="bg-green-500 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded inline-block">Login</a>
        <a href="#" className="bg-blue-500 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded inline-block">Register</a>
      </div>
    </div>
  </header></div>
  )
}

export default Header
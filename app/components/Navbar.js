import React from 'react'

export default function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <a className="navbar-brand" href="#">Sivapriya R</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="#education">Education</a></li>
                    <li className="nav-item"><a className="nav-link" href="#skills">Skills</a></li>
                    <li className="nav-item"><a className="nav-link" href="#experience">Experience</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

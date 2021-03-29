import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo.jsx'

export default class headerLogo extends Component {
  render() {
    return (
      <header className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link href="" className="logo d-flex align-items-center">
            <Logo />
            <Mural>Mural</Mural>
          </Link>
        </div>
      </header>
    )
  }
}

const Link = styled.a`
  color: #4154f1;
  text-decoration: none;
  :hover {
    color: #4154f1;
    text-decoration: none;
  }
`

const Mural = styled.span`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #012970;
  font-family: "Nunito", sans-serif;
  margin-top: 3px;
`

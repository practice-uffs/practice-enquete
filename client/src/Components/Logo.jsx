import React, { Component } from 'react'
import styled from 'styled-components'
import logoImg from '../Image/logo-practice.png'

export default class Logo extends Component {
  render() {
    return (
      <ImgLogo src={logoImg} alt="" />
    )
  }
}

const ImgLogo = styled.img`
  max-height: 40px;
  margin-right: 6px;
`
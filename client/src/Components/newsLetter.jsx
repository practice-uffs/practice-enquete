import React, { Component } from 'react'
import styled from 'styled-components'

export default class newsLetter extends Component {
  render() {
    return (
      <DivFooter>
        <FooterNewsLetter>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12 text-center">
                <h4>Nossa Newsletter</h4>
                <p>Fique por dentro de todas as novidades do programa e dos projetos que estamos trabalhando</p>
              </div>
              <div class="col-lg-6">
                <form action="{{ route('subscribers.store') }}" method="post">
                  <input type="email" name="email" placeholder="Ex. fulano@email.com" />
                  <input type="submit" value="Inscrever" />
                </form>
              </div>
            </div>
          </div>
        </FooterNewsLetter>
      </DivFooter>
    )
  }
}


const DivFooter = styled.div`
  background: #f6f9ff;
  padding: 0 0 30px 0;
  font-size: 14px;
`

const FooterNewsLetter = styled.div`
  padding: 50px 0;
  background: #f6f9ff;
  border-top: 1px solid #e1ecff;
  h4 {
    font-size: 24px;
    margin: 0 0 10px 0;
    padding: 0;
    line-height: 1;
    font-weight: 700;
    color: #012970;
  }
  form {
    margin-top: 20px;
    background: #fff;
    padding: 6px 10px;
    position: relative;
    border-radius: 4px;
    border: 1px solid #e1ecff;
    input[type="email"] {
      border: 0;
      padding: 8px;
      width: calc(100% - 140px);
    }
    input[type="submit"] {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border: 0;
      background: none;
      font-size: 16px;
      padding: 0 30px;
      margin: 3px;
      background: #4154f1;
      color: #fff;
      transition: 0.3s;
      border-radius: 4px;
    }
    input[type="submit"]:hover {
      background: #5969f3;
    }
  }
`
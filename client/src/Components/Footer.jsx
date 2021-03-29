import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo.jsx'

export default class Footer extends Component {
  render() {
    return (
      <DivFooter id="footer">
        <DivFooterTop>
          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-5 col-md-12 footer-info">
                <Link href="" className="logo d-flex align-items-center">
                  <Logo />
                </Link>
                <p>O Programa de Ampliação e Consolidação de Tecnologias e Inovação no Contexto Educacional (PRACTICE) objetiva estruturar ambientes e capacitar agentes educacionais para a produção e mediação de conteúdos por meio de tecnologias.</p>
                <div class="social-links mt-3">
                  <a href="https://www.instagram.com/practiceuffs/" class="instagram"><i class="bi bi-instagram bx bxl-instagram"></i></a>
                  <a href="https://github.com/practiceuffs" class="github"><i class="bi bi-github bx bxl-github"></i></a>
                  <a href="https://www.youtube.com/channel/UCu3jAl8MTMPkaxb3u0_xESw" class="youtube"><i class="bi bi-youtube"></i></a>
                  <a href="https://twitter.com/PracticeUFFS" class="twitter"><i class="bi bi-twitter"></i></a>
                  <a href="https://www.facebook.com/practiceuffs" class="facebook"><i class="bi bi-facebook"></i></a>
                  <a href="https://www.linkedin.com/company/practiceuffs" class="linkedin"><i class="bi bi-linkedin bx bxl-linkedin"></i></a>
                </div>
              </div>
              <div class="col-lg-2 col-6 footer-links">
                <h4>Links</h4>
                <ul>
                  {/* <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li> */}
                </ul>
              </div>
              <div class="col-lg-2 col-6 footer-links">
                <h4>Divulgação</h4>
                <ul>
                  <li><i class="bi bi-chevron-right"></i> <a href="https://cdn.uffs.cc/practice/website/marketing/PRACTICE-Panfleto-Servicos-de-audio-e-video.pdf">Serviços de áudio</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="https://cdn.uffs.cc/practice/website/marketing/PRACTICE-Panfleto-Servicos-de-conteudo.pdf">Serviços de conteúdo</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="https://cdn.uffs.cc/practice/website/marketing/PRACTICE-Panfleto-Servicos-de-Estudio.pdf">Serviços de estúdio</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="https://cdn.uffs.cc/practice/website/marketing/PRACTICE-Panfleto-Servicos-de-eventos-online.pdf">Serviços de eventos online</a></li>
                  <li><i class="bi bi-chevron-right"></i> <a href="https://cdn.uffs.cc/practice/website/marketing/PRACTICE-Panfleto-Servicos.pdf">Visão geral</a></li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4 class="text-justify">Contato</h4>
                <p class="text-justify">
                  <strong>Email:</strong> practice@uffs.edu.br<br/>
                  <strong>Atuações:</strong><br/>
                  Campus Erechim, Cerro Largo, Passo fundo, Chapecó, Realeza e Laranjeiras do Sul.
                </p>
              </div>
            </div>
          </div>
        </DivFooterTop>
        <div class="container">
          <Copyright />
          <Credits>
            <p>Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a></p>
            <SubCredits class="col text-center text-tiny" >
              {/* <p>
                As imagens utilizadas nesse site tem como fonte
                <a href="https://undraw.co/" rel="nofollow" target="_blank"> undraw.co/</a><br/>
                Created by
                <a href="https://twitter.com/ninaLimpi" rel="nofollow" target="_blank"> Katerina Limpitsouni</a>,
                Code / Design by
                <a href="https://twitter.com/anges244" rel="nofollow" target="_blank"> Aggelos Gesoulis</a>.
              </p> */}
            </SubCredits>
          </Credits>
        </div>
      </DivFooter>
    )
  }
}

const SubCredits = styled.div`
  font-size: 0.8;
  color: #bfbfbf;
`

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  color: #012970;
`

const Credits = styled.div`
  padding-top: 10px;
  text-align: center;
  font-size: 13px;
  color: #012970;
`

const DivFooter = styled.div`
  background: #f6f9ff;
  padding: 0 0 30px 0;
  font-size: 14px;
`

const DivFooterTop = styled.div`
  background-size: contain;
  border-top: 1px solid #e1ecff;
  border-bottom: 1px solid #e1ecff;
  padding: 60px 0 30px 0;

  @media (max-width: 992px) {
    background-position: center bottom;
  }

  .footer-info {
    margin-bottom: 30px;
  }

  .footer-info .logo {
    line-height: 0;
    margin-bottom: 15px;
  }

  .footer-info .logo img {
    max-height: 40px;
    margin-right: 6px;
  }

  .footer-info p {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 0;
    font-family: "Nunito", sans-serif;
  }

  .social-links a {
    font-size: 20px;
    display: inline-block;
    color: rgba(1, 41, 112, 0.5);
    line-height: 0;
    margin-right: 10px;
    transition: 0.3s;
  }

  .social-links a:hover {
    color: #012970;
  }

  h4 {
    font-size: 16px;
    font-weight: bold;
    color: #012970;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 12px;
  }

  .footer-links {
    margin-bottom: 30px;
  }

  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links ul i {
    padding-right: 2px;
    color: #d0d4fc;
    font-size: 12px;
    line-height: 0;
  }

  .footer-links ul li {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }

  .footer-links ul li:first-child {
    padding-top: 0;
  }

  .footer-links ul a {
    color: #013289;
    transition: 0.3s;
    display: inline-block;
    line-height: 1;
  }

  .footer-links ul a:hover {
    color: #4154f1;
  }

  .footer-contact p {
    line-height: 26px;
  }
`

const Link = styled.a`
  color: #4154f1;
  text-decoration: none;
  :hover {
    color: #4154f1;
    text-decoration: none;
  }
`
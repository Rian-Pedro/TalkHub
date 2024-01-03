import React, { useEffect } from 'react'
import "../scss/Home.scss"
import Header from '../components/Header'
import Container from '../components/Container'
import mesa from "../assets/mesa.png"
import symbol1 from "../assets/symbol1.svg"
import symbol2 from "../assets/symbol2.svg"
import symbol3 from "../assets/symbol3.svg"
import background from "../assets/home/background-home.png"
import img1 from "../assets/home/login-page.png"
import img2 from "../assets/home/chat-page.png"
import Footer from '../components/Footer'
import api from '../services/Api'

export const Home = () => {

  useEffect(() => {
    (async () => {
      await api.get('start')
    })()
  }, [])

  return (
    <>
      <Container>
        <Header />

        <div className='container-desc'>
          <div className='desc'>
            <div>
              <p className='first'>Bem Vindo</p>
            </div>
            <div>
              <p>Ao <span>TalkHub!</span></p>
            </div>

            <div className="desc-total">
              <p>Uma plataforma de bate-papo simplificada e altamente segura, projetada para tornar as suas conversas online mais práticas e protegidas.</p>
            </div>

          </div>

        </div>

        <div className="background">
          <img src={background} alt="" />
          {/* <div className="teste"></div> */}
        </div>
      </Container>

      <Container white={true} center={true}>
        
        <div className="testeTransition"></div>

        <div className='issues'>
          <h1>Funcionalidade simples!</h1>

          <div className='card-container'>
            <div className='card'>
              <div className='title'>
                <img src={symbol1} />
                <p>E-mail</p>
              </div>

              <p>Adicione pessoas através de seu e-mail</p>
            </div>
            <div className='card'>
              <div className='title'>
                <img src={symbol2} />
                <p>Mídia</p>
              </div>

              <p>Envie Imagens, vídeos e entre outras coisas</p>
            </div>
            <div className='card'>
              <div className='title'>
                <img src={symbol3} />
                <p>Personalize</p>
              </div>

              <p>Personalize com a sua cara</p>
            </div>

          </div>
        </div>

        <div className="testeTransition2"></div>

      </Container>

      <Container>
        <div className='images'>
          <div className="background-images"></div>

          <div className='content-images'>
            <h1>Crie sua conta e converse com amigos</h1>

            <div className="area-images">
              <div className="img">
                <img src={img1} alt="image-login" />
              </div>
              
              <div className="img">
                <img src={img2} alt="image-chat" />
              </div>
            </div>

          </div>

        </div>
      </Container>

      <Footer />
    </>
  )
}
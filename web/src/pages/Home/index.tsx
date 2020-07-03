import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header> 
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
          {/* aula 1 */}
          {/* <iframe src="https://anchor.fm/rhavi-carneiro/embed/episodes/Walk-n-Talk-Especial-Fluency-Week-2-Ingls---Aula-01-eg4jf1/a-a2jf92k" height="102px" width="400px" frameBorder="0" scrolling="no"></iframe> */}
          
          {/* aula 2 */}
          {/* <iframe src="https://anchor.fm/fluency-week/embed/episodes/Ingls---Segunda-aula-prtica-da-Fluency-Week-2-eg4k9g/a-a2jfe13" height="102px" width="400px" frameBorder="0" scrolling="no"></iframe> */}
          {/* <iframe src="https://anchor.fm/rhavi-carneiro/embed/episodes/Walk-n-Talk-Especial-Fluency-Week-2-Ingls---Aula-02-eg4joh/a-a2jfao7" height="102px" width="400px" frameBorder="0" scrolling="no"></iframe> */}
          {/* aula 3 gavin */}
          {/* <iframe src="https://anchor.fm/fluency-week/embed/episodes/Ingls---Terceira-aula-prtica-da-Fluency-Week-2-eg5bgo/a-a2jjo2p" height="102px" width="400px" frameBorder="0" scrolling="no"></iframe> */}
          {/* <iframe src="https://anchor.fm/rhavi-carneiro/embed/episodes/Walk-n-Talk-Especial-Fluency-Week-2-Ingls---Aula-03-eg5bjt/a-a2jv7uq" height="102px" width="400px" frameBorder="0" scrolling="no"></iframe> */}
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;
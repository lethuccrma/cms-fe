import React, {  } from 'react';
import { HomeStyled } from './styled';
import Base from '../Base';

const Home: React.FC = () => {
  return (
    <Base headerTitle="Home">
      <HomeStyled></HomeStyled>
    </Base>
  );
};

export default Home;

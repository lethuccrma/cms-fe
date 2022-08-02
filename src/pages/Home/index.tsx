import React, {  } from 'react';
import { HomeStyled } from './styled';
import Base from '../Base';
import { useSelector } from 'react-redux';
import { ICollection } from '../../types/ICollection';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const collections = useSelector<{collection: ICollection[]}, ICollection[]>((state) => state.collection);
  const navigate = useNavigate();

  if (collections.length > 0) {
    navigate(`/collection-type/${collections[0].collectionName}`);
  }

  return (
    <Base headerTitle="Home">
      <HomeStyled></HomeStyled>
    </Base>
  );
};

export default Home;

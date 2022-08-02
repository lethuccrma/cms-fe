import React, {  } from 'react';
import { ContentTypeStyled } from './styled';
import Base from '../Base';
import { useSelector } from 'react-redux';
import { ICollection } from '../../types/ICollection';
import ContentTypeList from '../../components/ContentTypeList';
import { useParams } from 'react-router-dom';

const ContentType: React.FC = () => {
  const collections = useSelector<{collection: ICollection[]}, ICollection[]>((state) => state.collection);
  const { collectionName } = useParams();

  return (
    <Base headerTitle="Content Types">
      <ContentTypeStyled>
        <div style={{flex: 1, background: 'rgba(0,0,0,0.1)'}}>
          <ContentTypeList selectedCollection={collectionName} />
        </div>
        <div style={{flex: 3}}></div>
      </ContentTypeStyled>
    </Base>
  );
};

export default ContentType;

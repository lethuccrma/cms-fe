import React, { useMemo } from 'react';
import { ContentTypeStyled } from './styled';
import Base from '../Base';
import ContentTypeList from '../../components/ContentTypeList';
import ContentTypeDetail from '../../components/ContentTypeDetails';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICollection } from '../../types/ICollection';

const ContentType: React.FC = () => {
  const { collectionName } = useParams();
  const collections = useSelector<{ collection: ICollection[] }, ICollection[]>(
    (state) => state.collection,
  );

  const collectionFound = useMemo(() => collections.some((c) => c.collectionName === collectionName), [collectionName, collections]);

  return (
    <Base headerTitle="Content Types">
      <ContentTypeStyled>
        <div style={{flex: 1, background: 'rgba(0,0,0,0.1)'}}>
          <ContentTypeList />
        </div>
        <div style={{flex: 3}}>
          {collectionFound && <ContentTypeDetail />}
        </div>
      </ContentTypeStyled>
    </Base>
  );
};

export default ContentType;

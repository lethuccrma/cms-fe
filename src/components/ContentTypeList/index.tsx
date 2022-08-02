import React from 'react';
import { ContentTypeListStyled } from './styled';
import { useSelector } from 'react-redux';
import { ICollection } from '../../types/ICollection';
import { Button } from 'antd';
import { COLORS } from '../../constants/colors';
import { useNavigate } from 'react-router-dom';

const ContentTypeList: React.FC<{ selectedCollection?: string }> = ({
  selectedCollection,
}) => {
  const collections = useSelector<{ collection: ICollection[] }, ICollection[]>(
    (state) => state.collection,
  );
  const navigate = useNavigate();

  return (
    <ContentTypeListStyled>
      <div className="text-md">{`${collections.length} Types`}</div>
      <Button
        type="text"
        className="border-dashed w-full mt-6 h-11 rounded-md"
        style={{
          color: COLORS.strongPurple,
          borderWidth: 1,
          borderColor: COLORS.strongPurple,
          background: 'rgba(255,255,255,0.5)',
        }}
      >
        + New Type
      </Button>
      {collections.map((c) => (
        <Button
          key={c.collectionName}
          type="text"
          className="w-full mt-2 h-11 rounded-md"
          style={
            c.collectionName === selectedCollection
              ? {
                  color: COLORS.white,
                  fontWeight: 700,
                  background: COLORS.strongPurple,
                }
              : { color: COLORS.blackText, background: COLORS.white }
          }
          onClick={() => navigate(`/content-type/${c.collectionName}`)}
        >
          <div className='flex justify-between'>
            <div>{c.collectionName}</div>
            <div>{Object.keys(c.attributes || {}).length}</div>
          </div>
        </Button>
      ))}
    </ContentTypeListStyled>
  );
};

export default ContentTypeList;

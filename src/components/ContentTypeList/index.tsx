import React, { useState } from 'react';
import { ContentTypeListStyled } from './styled';
import { useSelector } from 'react-redux';
import { ICollection } from '../../types/ICollection';
import { Button } from 'antd';
import { COLORS } from '../../constants/colors';
import { useNavigate, useParams } from 'react-router-dom';
import AddCollectionModal from '../AddCollectionModal';
import AuthorizedAPI from '../../apis/authorized';
import { COLLECTION } from '../../configs/server';
import { useDispatch } from 'react-redux';
import { FETCH_COLLECTIONS } from '../../redux/collection/collection.saga';

const ContentTypeList: React.FC = () => {
  const { collectionName: selectedCollection } = useParams();
  const collections = useSelector<{ collection: ICollection[] }, ICollection[]>(
    (state) => state.collection,
  );
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState('');
  const [addCollectionVisible, setAddCollectionVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddCollection = ({
    collectionName,
  }: {
    collectionName: string;
  }) => {
    setRequesting(true);
    setError('');
    AuthorizedAPI.post(`${COLLECTION}`, {
      collectionName,
      attributes: {},
    })
      .then(() => {
        setAddCollectionVisible(false);
        dispatch(FETCH_COLLECTIONS());
        navigate(`/content-type/${collectionName}`);
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => {
        setRequesting(false);
      });
  };

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
        onClick={() => setAddCollectionVisible(true)}
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
          <div className="flex justify-between">
            <div>{c.collectionName}</div>
            <div>{Object.keys(c.attributes || {}).length}</div>
          </div>
        </Button>
      ))}
      <AddCollectionModal
        onSubmit={handleAddCollection}
        onClose={() => setAddCollectionVisible(false)}
        modalVisible={addCollectionVisible}
        header="Add Type"
        loading={requesting}
        error={error}
      />
    </ContentTypeListStyled>
  );
};

export default ContentTypeList;

import React, { useState } from 'react';
import { ContentTypeDetailStyled } from './styled';
import { useSelector } from 'react-redux';
import { IAttribute, ICollection } from '../../types/ICollection';
import { Button, Modal } from 'antd';
import { COLORS } from '../../constants/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import AuthorizedAPI from '../../apis/authorized';
import { COLLECTION } from '../../configs/server';
import { useDispatch } from 'react-redux';
import { FETCH_COLLECTIONS } from '../../redux/collection/collection.saga';
import Field from './Field';
import FieldModal from './FieldModal';
import _ from 'lodash';

const ContentTypeDetail: React.FC = () => {
  const [deleteCollectionVisible, setDeleteCollectionVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const collections = useSelector<{ collection: ICollection[] }, ICollection[]>(
    (state) => state.collection,
  );
  const { collectionName } = useParams();
  const selectedCollection = collections.find(
    (c) => c.collectionName === collectionName,
  );
  const [fieldVisible, setFieldVisible] = useState(false);
  const [error, setError] = useState('');
  const [selectedField, setSelectedField] = useState<
    IAttribute & { name: string }
  >();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteCollection = () => {
    setRequesting(true);
    AuthorizedAPI.delete(`${COLLECTION}/${collectionName}`)
      .then(() => {
        dispatch(FETCH_COLLECTIONS());
        navigate('/content-type');
      })
      .catch((err) => {
        alert(err.response?.data?.message || err.message);
      })
      .finally(() => setRequesting(false));
  };

  const handleFieldSubmit = (value: IAttribute & { name: string }) => {
    setRequesting(true);
    setError('');
    AuthorizedAPI.put(`${COLLECTION}`, {
      collectionName,
      attributes: _.omit(selectedCollection?.attributes, value.name),
    }).then(() => {
      setTimeout(() => {
        AuthorizedAPI.put(`${COLLECTION}`, {
          collectionName,
          attributes: {
            ...selectedCollection?.attributes,
            [value.name]: {
              type: value.type,
              displayName: value.displayName,
            },
          },
        })
          .then(() => {
            dispatch(FETCH_COLLECTIONS());
            closeFieldModal();
          })
          .catch((err) => {
            setError(err.response?.data?.message || err.message);
          })
          .finally(() => setRequesting(false));
      }, 6000);
    });
  };

  const handleDeleteField = (value: IAttribute & { name: string }) => {
    setRequesting(true);
    setError('');
    AuthorizedAPI.put(`${COLLECTION}`, {
      collectionName,
      attributes: _.omit(selectedCollection?.attributes, value.name),
    })
      .then(() => {
        dispatch(FETCH_COLLECTIONS());
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setRequesting(false));
  }

  const closeFieldModal = () => {
    setError('');
    setSelectedField(undefined);
    setFieldVisible(false);
  };

  const openFieldModal = (field?: IAttribute & { name: string }) => {
    setError('');
    setSelectedField(field);
    setFieldVisible(true);
  };

  return (
    <ContentTypeDetailStyled>
      <div
        className="text-3xl font-bold flex items-center"
        style={{ color: COLORS.blackText }}
      >
        <div>{collectionName}</div>
        <Button
          onClick={() => setDeleteCollectionVisible(true)}
          className="ml-2 text-red-500"
          icon={<DeleteOutlined />}
          type="text"
        />
      </div>
      <div className="text-xl" style={{ color: COLORS.blackText }}>
        {Object.keys(selectedCollection?.attributes || {}).length} Fields
      </div>
      <Button
        type="text"
        className="border-dashed w-full mt-6 h-11 rounded-md"
        style={{
          color: COLORS.strongPurple,
          borderWidth: 1,
          borderColor: COLORS.strongPurple,
          background: 'rgba(255,255,255,0.5)',
        }}
        onClick={() => openFieldModal()}
      >
        + Add another field
      </Button>
      {Object.keys(selectedCollection?.attributes || {}).map((key) => (
        <Field
          key={key}
          {...(selectedCollection?.attributes?.[key] as IAttribute)}
          name={key}
          onEdit={openFieldModal}
          onDelete={handleDeleteField}
        />
      ))}

      <FieldModal
        onSubmit={handleFieldSubmit}
        onClose={closeFieldModal}
        modalVisible={fieldVisible}
        initialValues={selectedField}
        header={selectedField ? 'Edit' : 'Add'}
        loading={requesting}
        error={error}
      />

      <Modal
        title="Delete Type"
        visible={deleteCollectionVisible}
        okText="Delete"
        okButtonProps={{
          danger: true,
          loading: requesting,
          disabled: requesting,
        }}
        onOk={handleDeleteCollection}
        onCancel={() => setDeleteCollectionVisible(false)}
      >
        <p>
          Are you sure that you want to delete this Type? You can not undo this
          action.
        </p>
      </Modal>
    </ContentTypeDetailStyled>
  );
};

export default ContentTypeDetail;

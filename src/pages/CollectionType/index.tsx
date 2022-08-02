import React, { useEffect, useState } from 'react';
import { CollectionStyled } from './styled';
import Base from '../Base';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DATA_TYPE, ICollection } from '../../types/ICollection';
import { Button, Table } from 'antd';
import useCollectionData from './hooks';
import { EditFilled, DeleteOutlined, UpCircleOutlined, DownCircleFilled } from '@ant-design/icons';
import { COLORS } from '../../constants/colors';
import CollectionTypeModal from '../../components/CollectionTypeModal';
import { COLLECTION } from '../../configs/server';
import AuthorizedAPI from '../../apis/authorized';

const CollectionType: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { collectionName } = useParams();
  const collection = useSelector<
    { collection: ICollection[] },
    ICollection | undefined
  >((state) =>
    state.collection.find((c) => c.collectionName === collectionName),
  );
  const [editedEntity, setEditedEntity] = useState<any>();
  const [entityModalVisible, setEntityModalVisible] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [requestError, setRequestError] = useState('');

  const {
    data: collectionData,
    refetch,
    pagination,
    loading,
    error,
  } = useCollectionData({
    page: currentPage,
    take: pageSize,
    collectionName: collectionName,
  });

  const handleCloseModal = () => {
    setEditedEntity(undefined);
    setEntityModalVisible(false);
  };

  const handleEntitySubmit = (value: any) => {
    console.log(Object.keys(value));
    const submitData = Object.keys(value).reduce((pre, key) => {
      if (
        collection?.attributes?.[key]?.type === DATA_TYPE.DATE_TIME &&
        value[key]
      ) {
        return { ...pre, [key]: value[key].toDate() };
      }
      return { ...pre, [key]: value[key] };
    }, {});

    const endpoint = editedEntity
      ? `${COLLECTION}/${collectionName}/${editedEntity.id}`
      : `${COLLECTION}/${collectionName}`;
    const method = editedEntity ? AuthorizedAPI.patch : AuthorizedAPI.post;

    setRequesting(true);
    method(endpoint, submitData)
      .then(() => {
        handleCloseModal();
        refetch();
      })
      .catch((err) => setRequestError(err.response.data.message || err.message))
      .finally(() => setRequesting(false));
  };

  const handleAddNewPress = () => {
    setEditedEntity(undefined);
    setEntityModalVisible(true);
  };

  const handleEditEntityPress = (data: any) => {
    setEditedEntity(data);
    setEntityModalVisible(true);
  };

  const handleDeleteEntity = (data: any) => {
    setRequesting(true);
    AuthorizedAPI.delete(`${COLLECTION}/${collectionName}/${data.id}`)
      .then(() => {
        refetch();
      })
      .catch((err) => setRequestError(err.response.data.message || err.message))
      .finally(() => setRequesting(false));
  };

  const handlePublishEntity = (data: any, publish = true) => {
    setRequesting(true);
    AuthorizedAPI.patch(`${COLLECTION}/${collectionName}/${data.id}`, {publishedAt: publish ? new Date() : null})
      .then(() => {
        refetch();
      })
      .catch((err) => setRequestError(err.response.data.message || err.message))
      .finally(() => setRequesting(false));
  }

  const getColumns = (collection: ICollection) => {
    const attributeNames = Object.keys(collection.attributes || {});
    const columns: {
      title?: string;
      dataIndex?: string;
      key?: string;
      render?: (data: any) => React.ReactNode;
    }[] = attributeNames.map((name) => ({
      title: collection.attributes?.[name]?.displayName || name,
      dataIndex: name,
      key: name,
    }));

    columns.push({
      dataIndex: 'actionBtns',
      key: 'actionBtns',
      render: (data: any) => (
        <div className="flex justify-end">
          <Button
            disabled={requesting}
            loading={requesting}
            onClick={() => handlePublishEntity(data, !data.publishedAt)}
            icon={!data.publishedAt ? <UpCircleOutlined /> : <DownCircleFilled />}
            className="ml-2"
            type="text"
          />
          <Button
            disabled={requesting}
            loading={requesting}
            onClick={() => handleEditEntityPress(data)}
            icon={<EditFilled />}
            className="ml-2"
            type="text"
          />
          <Button
            disabled={requesting}
            loading={requesting}
            onClick={() => handleDeleteEntity(data)}
            icon={<DeleteOutlined />}
            type="text"
            danger
          />
        </div>
      ),
    });

    return columns;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [collectionName]);

  return (
    <Base headerTitle={collectionName} defaultSelectedKey={collectionName}>
      <CollectionStyled>
        {!!error && <div className="text-red-500">{error}</div>}
        {collection ? (
          <div>
            <div className="flex mt-4 items-center justify-between">
              <div
                className="text-2xl font-black"
                style={{ color: COLORS.blackText }}
              >{`${pagination.total} Entries Found`}</div>
              <Button
                className="text-xl"
                style={{ color: COLORS.blueText }}
                type="text"
                onClick={handleAddNewPress}
              >
                Add a new
              </Button>
            </div>
            <Table
              className="mt-4"
              pagination={{
                onChange: (page) => setCurrentPage(page),
                current: currentPage,
                defaultPageSize: pageSize,
                total: pagination.total,
                disabled: loading,
                responsive: true,
              }}
              columns={getColumns(collection)}
              dataSource={collectionData.map((v) => ({ ...v, actionBtns: v }))}
              rowKey="id"
            />
            <CollectionTypeModal
              onSubmit={handleEntitySubmit}
              onClose={() => setEntityModalVisible(false)}
              initialValues={editedEntity || {}}
              modalVisible={entityModalVisible}
              loading={requesting}
              header={editedEntity ? 'Edit' : 'Add new'}
              error={requestError}
              collection={collection}
            />
          </div>
        ) : (
          'Could not find collection.'
        )}
      </CollectionStyled>
    </Base>
  );
};

export default CollectionType;

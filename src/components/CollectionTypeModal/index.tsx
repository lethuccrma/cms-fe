import React, { useEffect } from 'react';
import { CollectionTypeStyled } from './styled';
import { DatePicker, Form, Input, InputNumber, Modal, Typography } from 'antd';
import { DATA_TYPE, ICollection } from '../../types/ICollection';
import moment from 'moment';

const { Text } = Typography;

const CollectionTypeModal: React.FC<{
  onSubmit: (value: any) => void;
  onClose: () => void;
  initialValues: any;
  modalVisible: boolean;
  loading: boolean;
  header: string;
  error: string;
  collection: ICollection;
}> = ({
  onClose,
  onSubmit,
  initialValues,
  modalVisible,
  loading,
  error,
  header,
  collection,
}) => {
  const [form] = Form.useForm();

  const handleOkPress = () => {
    form.submit();
  };

  const handleFormSubmit = (value: any) => {
    onSubmit({ ...value, id: initialValues.id });
  };

  const renderInputs = () =>
    Object.keys(collection.attributes || {}).map((attName) => {
      const attribute = collection.attributes?.[attName];

      switch (attribute?.type) {
        case DATA_TYPE.TEXT:
          return (
            <Form.Item
              key={attName}
              label={attribute.displayName}
              name={attName}
            >
              <Input />
            </Form.Item>
          );
        case DATA_TYPE.INTEGER:
          return (
            <Form.Item
              key={attName}
              label={attribute.displayName}
              name={attName}
            >
              <InputNumber step={1} />
            </Form.Item>
          );
        case DATA_TYPE.FLOAT:
          return (
            <Form.Item
              key={attName}
              label={attribute.displayName}
              name={attName}
            >
              <InputNumber step={0.000001} />
            </Form.Item>
          );
        case DATA_TYPE.DATE_TIME:
          return (
            <Form.Item
              key={attName}
              label={attribute.displayName}
              name={attName}
            >
              <DatePicker />
            </Form.Item>
          );
      }
    });

  const formatInitialData = () =>
    Object.keys(collection.attributes || {}).reduce((pre, key) => {
      if (
        collection.attributes?.[key]?.type === DATA_TYPE.DATE_TIME &&
        initialValues[key]
      ) {
        return { ...pre, [key]: moment(initialValues[key]) };
      }
      if (initialValues[key]) {
        return { ...pre, [key]: initialValues[key] };
      }
      return pre;
    }, {});
  
  useEffect(() => form.resetFields(), [initialValues]);

  return (
    <CollectionTypeStyled>
      <Modal
        title={header}
        visible={modalVisible}
        onOk={handleOkPress}
        onCancel={onClose}
        okButtonProps={{ ghost: true, type: 'primary' }}
        cancelButtonProps={{ danger: true, type: 'primary' }}
        confirmLoading={loading}
        width={800}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={form}
          onFinish={handleFormSubmit}
          initialValues={formatInitialData()}
        >
          {renderInputs()}
        </Form>
        <Text className="text-red-500">{error}</Text>
      </Modal>
    </CollectionTypeStyled>
  );
};

export default CollectionTypeModal;

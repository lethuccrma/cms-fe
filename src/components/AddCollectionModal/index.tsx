import React from 'react';
import { Form, Input, Modal, Typography } from 'antd';

const { Text } = Typography;

const AddCollectionModal: React.FC<{
  onSubmit: (value: any) => void;
  onClose: () => void;
  modalVisible: boolean;
  header: string;
  loading?: boolean;
  error?: string;
}> = ({ onClose, onSubmit, modalVisible, header, loading, error }) => {
  const [form] = Form.useForm();

  const handleOkPress = () => {
    form.submit();
  };

  const handleFormSubmit = (value: any) => {
    onSubmit(value);
  };

  return (
    <Modal
      title={header}
      visible={modalVisible}
      onOk={handleOkPress}
      onCancel={onClose}
      okButtonProps={{ ghost: true, type: 'primary' }}
      cancelButtonProps={{ danger: true, type: 'primary' }}
      width={800}
      afterClose={() => form.resetFields()}
      confirmLoading={loading}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        form={form}
        onFinish={handleFormSubmit}
      >
        <Form.Item label="Type" name="collectionName">
          <Input />
        </Form.Item>
      </Form>
      <Text className="text-red-500">{error}</Text>
    </Modal>
  );
};

export default AddCollectionModal;

import React, { useEffect } from 'react';
import { Form, Input, Modal, Select, Typography } from 'antd';
import { DATA_TYPE, IAttribute } from '../../types/ICollection';

const { Text } = Typography;
const { Option } = Select;

const FieldModal: React.FC<{
  onSubmit: (value: any) => void;
  onClose: () => void;
  modalVisible: boolean;
  initialValues?: IAttribute & { name: string };
  header: string;
  loading?: boolean;
  error?: string;
}> = ({
  onClose,
  onSubmit,
  modalVisible,
  header,
  loading,
  error,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleOkPress = () => {
    form.submit();
  };

  const handleFormSubmit = (value: any) => {
    onSubmit(value);
  };

  useEffect(() => {
    form.resetFields();
  }, [initialValues, modalVisible]);

  return (
    <Modal
      title={header}
      visible={modalVisible}
      onOk={handleOkPress}
      onCancel={onClose}
      okButtonProps={{ ghost: true, type: 'primary' }}
      cancelButtonProps={{ danger: true, type: 'primary' }}
      width={800}
      confirmLoading={loading}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        form={form}
        onFinish={handleFormSubmit}
        initialValues={initialValues || {}}
      >
        <Form.Item label="Name" name="name">
          <Input disabled={!!initialValues} />
        </Form.Item>
        <Form.Item label="Display name" name="displayName">
          <Input />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Option value={DATA_TYPE.TEXT}>Text</Option>
            <Option value={DATA_TYPE.INTEGER}>Integer</Option>
            <Option value={DATA_TYPE.FLOAT}>Float</Option>
            <Option value={DATA_TYPE.FILE} disabled>
              File
            </Option>
            <Option value={DATA_TYPE.DATE_TIME}>Date time</Option>
          </Select>
        </Form.Item>
      </Form>
      <Text className="text-red-500">{error}</Text>
    </Modal>
  );
};

export default FieldModal;

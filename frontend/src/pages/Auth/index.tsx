import { Input, Modal, Select } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPageComponent: React.FC = () => {
  const navigate = useNavigate();

  const okButtonHandler = () => {
    navigate('/');
  };

  return (
    <>
      <Modal
        open
        centered
        closable={false}
        onOk={okButtonHandler}
        cancelButtonProps={{ className: 'hidden' }}
        title="Real-time Chat Application"
      >
        <Input placeholder="Please input your username" />
        <Select
          className="w-full mt-2"
          placeholder="Select room to join"
          options={Array.from(Array(10).keys()).map((item) => ({
            value: item,
            label: `Room ${item}`,
          }))}
        />
      </Modal>
    </>
  );
};

export default AuthPageComponent;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageComponent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/chat/0');
  }, [navigate]);

  return <></>;
};

export default HomePageComponent;

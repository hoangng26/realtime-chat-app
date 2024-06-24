import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageComponent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const channelId = localStorage.getItem('channelId');
    navigate(`/chat/${channelId}`);
  }, [navigate]);

  return <></>;
};

export default HomePageComponent;

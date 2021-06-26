import React from 'react';
import routes from '../routes';
import MainTemplate from '../templates/MainTemplate';
import Button from '../components/Button';

const HomeView = () => (
  <MainTemplate>
    <Button btnType="link" to={routes.chat}>
      Znajdź rozmówcę
    </Button>
  </MainTemplate>
);

export default HomeView;

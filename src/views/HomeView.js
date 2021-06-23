import React from 'react';
import Button from '../components/Button';
import routes from '../routes';

const HomeView = () => (
  <div>
    <h1>Widok domowy</h1>
    <Button btnType="link" to={routes.chat}>
      Znajdź rozmówcę
    </Button>
  </div>
);

export default HomeView;

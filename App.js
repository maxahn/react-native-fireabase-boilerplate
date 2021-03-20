import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import BottomNavigationBar from './src/components/molecules/BottomNavigationBar';
import { FirebaseContext, Firebase } from './src/services/Firebase';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <FirebaseContext.Provider value={new Firebase()}>
          <BottomNavigationBar />
        </FirebaseContext.Provider>
      </ApplicationProvider>
    </>
  );
};

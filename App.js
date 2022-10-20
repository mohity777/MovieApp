import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigationContainer from './src/navigation';
import store from './src/store';
import 'recyclerlistview';
import './k.jpeg'
const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
       <AppNavigationContainer />
      </Provider>
    </SafeAreaView>
  );
};

export default App;

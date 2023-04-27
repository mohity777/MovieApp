import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigationContainer from './src/navigation';
import store from './src/store';

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
       <AppNavigationContainer />
      </Provider>
    </SafeAreaView>
  );
};

//feat
// p
// c
// 1
// 2
export default App;

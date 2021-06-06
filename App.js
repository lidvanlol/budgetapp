import React from 'react';
import {Provider} from 'react-redux';
import AppNav from './src/components/navigation/appStack';



import {store, persistor} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
          
     
      <AppNav/>
      
    </Provider>
  );
}

export default App;

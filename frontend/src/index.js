import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ghpages from 'gh-pages';
const path = require('path');

ghpages.publish(path.resolve(__dirname, '../backend/dist'), function(err) {console.log(err)});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// ReactDOM.render(
//   <Footer />,
//   document.getElementById('footer')
// );

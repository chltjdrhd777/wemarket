import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'Redux/store';
import { Global, css } from '@emotion/react';
import 'normalize.css';

const globalCSS = css`
  * {
    box-sizing: border-box;
  }

  body,
  html {
    background-color: #f5f5f5;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

render(
  </* React.StrictMode */>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalCSS} />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </>,
  document.getElementById('root')
);

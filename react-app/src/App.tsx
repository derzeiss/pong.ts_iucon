import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResultView } from './results/ResultView';
import { globalStyle } from './ui/global';

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyle} />
      <Routes>
        <Route path="/" element={<ResultView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

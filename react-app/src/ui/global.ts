import { css } from '@emotion/react';
import { color } from './config';

export const globalStyle = css`
  * {
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100vh;
    overflow-x: hidden;
    font: 400 18px/27px 'Poppins', sans-serif;

    color: ${color.text.primary};
    background: ${color.ui.light};
  }

  .m-bottom {
    margin-bottom: 1rem;
  }

  .m-bottom_sm {
    margin-bottom: 0.5rem;
  }

  .m-top {
    margin-top: 1rem;
  }

  .m-top_sm {
    margin-top: .5rem;
  }
`;

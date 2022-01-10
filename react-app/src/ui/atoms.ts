import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color } from './config';

///////////////////////////////
// GRID

export const Container = styled.div`
  width: 90%;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
`;

export const Section = styled.section<{ first?: boolean }>`
  margin-top: ${(props) => (props.first ? '2rem' : '4rem')};
  margin-bottom: 4rem;
`;

export const Subsection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

///////////////////////////////
// TEXT

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 3.375rem;
  line-height: 1.3em;
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 1.3em;
`;

export const H3 = styled.h3`
  font-weight: 600;
  font-size: 1.5rem;
`;

export const H4 = styled.h4`
  font-weight: 600;
  font-size: 1rem;
`;

export const Strong = styled.strong<{ number?: boolean }>`
  font-weight: ${(props) => (props.number ? 700 : 600)};
  font-size: 0.9em;
`;

export const EmptyState = styled.div`
  font-style: italic;
  color: ${color.text.secondary};
`;

///////////////////////////////
// BUTTON

export const Button = styled.button`
  font: inherit;
  border: none;
  background: none;

  display: inline-block;
  padding: 0.5rem 1rem;

  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.05em;

  color: ${color.text.light};
  background: ${color.text.primary};
  user-select: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

///////////////////////////////
// TABLE

export const Table = styled.table`
  border-collapse: collapse;
`;

export const defaultTableStyles = css`
  padding: 0.1rem 0.3rem;

  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    padding-right: 0;
  }
`;

export const Th = styled.th`
  ${defaultTableStyles};
  padding-top: 0.5rem;

  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1.2em;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  text-align: left;
  color: ${color.text.meta};
`;

export const Td = styled.td<{ number?: boolean }>`
  ${defaultTableStyles};

  ${(props) =>
    props.number &&
    css`
      font-family: 'Inconsolata', monospace;
      font-size: 1.1rem;
      text-align: right;
    `};
`;

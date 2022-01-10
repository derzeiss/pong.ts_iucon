import { ScoreArray } from '@derzeiss/pong';
import React from 'react';
import { H3, Strong, Subsection, Table, Td, Th } from '../ui/atoms';

interface IVsTableProps {
  index: number;
  name: string;
  data: { score: number; matches: { [name: string]: ScoreArray } };
}

export const VsTable: React.FC<IVsTableProps> = ({ index, name, data }) => {
  return (
    <Subsection>
      <H3 className="m-bottom_sm">
        #{index} {name}
      </H3>
      <Table>
        <tbody>
          <tr>
            <Th>Opponent</Th>
            <Th>Wins</Th>
            <Th>Losses</Th>
            <Th>Draws</Th>
          </tr>
          {Object.entries(data.matches)
            .sort((a, b) => b[1][1] - a[1][1])
            .map(([oppName, scores]) => (
              <tr key={`${name}-${oppName}`}>
                <Td>{oppName}</Td>
                <Td number>{scores[1]}</Td>
                <Td number>{scores[2]}</Td>
                <Td number>{scores[0]}</Td>
              </tr>
            ))}
          <tr>
            <Td>
              <Strong>AVG</Strong>
            </Td>
            <Td number>
              <Strong number>{data.score}</Strong>
            </Td>
            <Td></Td>
          </tr>
        </tbody>
      </Table>
    </Subsection>
  );
};

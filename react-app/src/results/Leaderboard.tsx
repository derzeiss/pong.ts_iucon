import React from 'react';
import { Table, Td, Th } from '../ui/atoms';
import { ILeaderboardItem } from './results.types';

interface ILeaderboardProps {
  leaderboard: ILeaderboardItem[];
}

export const Leaderboard: React.FC<ILeaderboardProps> = ({ leaderboard }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <Th>#</Th>
          <Th>Name</Th>
          <Th>Score</Th>
        </tr>
        {leaderboard.map((i, index) => (
          <tr key={i.name}>
            <Td number>{index}</Td>
            <Td>{i.name}</Td>
            <Td number>{i.score}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

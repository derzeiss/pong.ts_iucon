import { SimulationResults } from '@derzeiss/pong';
import { useEffect, useMemo, useState } from 'react';
import { ResultResource } from './ResultResource';
import { useStateMachine, BasicState } from '../util/useStateMachine';
import { Button, Container, EmptyState, H1, H2, H3, Section, Subsection } from '../ui/atoms';
import { ILeaderboardItem } from './results.types';
import { Leaderboard } from './Leaderboard';
import { VsTable } from './VsTable';

export const ResultView: React.FC = () => {
  const [results, setResults] = useState({} as SimulationResults);
  const [btnMessageTimeout, setBtnMessageTimeout] = useState<any>(null);

  const { state, msg, nextState } = useStateMachine(BasicState.Initial);
  const {
    state: btnState,
    msg: btnMsg,
    nextState: _btnNextState,
  } = useStateMachine(BasicState.Initial);

  const btnNextState = (_state: BasicState, _msg?: string) => {
    if (btnMessageTimeout) {
      clearTimeout(btnMessageTimeout);
      setBtnMessageTimeout(null);
    }
    _btnNextState(_state, _msg);
  };

  const leaderboard = useMemo<ILeaderboardItem[]>(() => {
    return Object.keys(results)
      .map((name) => {
        const result = results[name];
        return {
          name,
          score: result.score,
        };
      })
      .sort((a, b) => {
        return b.score - a.score;
      });
  }, [results]);

  const hideMsgAfterTimeout = (ms: number = 4000) => {
    const timeout = setTimeout(() => {
      btnNextState(BasicState.Initial);
    }, ms);
    setBtnMessageTimeout(timeout);
  };

  const handleUpdateResults = () => {
    btnNextState(BasicState.Loading, 'Updating results...');
    ResultResource.update()
      .then((data) => {
        setResults(data);
        btnNextState(BasicState.Success, 'Successfully updated results.');
        hideMsgAfterTimeout();
      })
      .catch((err) => {
        console.error(err);
        btnNextState(BasicState.Error, 'Error while updating results. Please try again.');
        hideMsgAfterTimeout();
      });
  };

  useEffect(() => {
    nextState(BasicState.Loading, 'Loading results...');
    ResultResource.read()
      .then((data) => {
        setResults(data);
        nextState(BasicState.Success);
      })
      .catch((err) => {
        console.error(err);
        nextState(BasicState.Error, 'Error while fetching results. Please try again.');
      });
  }, [nextState]);

  const getContent = () => {
    if (state !== BasicState.Success)
      return (
        <Subsection>
          <EmptyState>{msg}</EmptyState>
        </Subsection>
      );
    return (
      <>
        <Section first>
          <H3>Tl;dr</H3>
          <Leaderboard leaderboard={leaderboard} />
          <Button
            type="button"
            onClick={handleUpdateResults}
            className="m-top_sm"
            disabled={btnState === BasicState.Loading}
          >
            Update results
          </Button>
          {btnState !== BasicState.Initial && <EmptyState>{btnMsg}</EmptyState>}
        </Section>
        <Section>
          {Object.entries(results).map(([name, data], index) => (
            <VsTable key={name} index={index} name={name} data={data} />
          ))}
        </Section>
      </>
    );
  };
  return (
    <Container>
      <Section first>
        <H1>Results</H1>
        {getContent()}
      </Section>
    </Container>
  );
};

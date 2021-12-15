import { useState } from 'react';
import './App.css';
import { Box, Button, Container } from '@material-ui/core';
import JournalDetail from './components/JournalDetail';

import { useEffect } from 'react';

interface IJournals {
  id: number,
  description: string,
  date: string,
  time: string,
  action: string,
}

const App = () => {
  const [journalList, setJournalList] = useState<IJournals[]>([])

  useEffect(() => {
    (async () => {
      const getJournals = JSON.parse(localStorage.getItem('journals') as string);
      const newJournals = [...getJournals].map((jn) => ({
        ...jn,
        action: ''
      }))
      setJournalList(newJournals);
    })()
  }, [])

  const handleOnClickJournal = (id: number, action: string, descriptionNewVal: { date: string, description: string }) => {
    const newJournalList = [...journalList];
    let newId = 0;
    if (action === 'ADD') {
      newJournalList.unshift({
        id: Math.random(),
        description: '',
        date: '',
        time: '',
        action: 'add',
      })
    }
    if (action === 'DELETE') {
      const newJournal = [...journalList].filter((jn) => jn.id !== id)
      localStorage.setItem('journals', JSON.stringify(newJournal));
      return setJournalList(newJournal)
    }
    newJournalList.forEach((nj) => {
      if (nj.id === id) {
        if (action === 'EDIT') {
          nj.action = 'edit'
        }
        if (action === 'CANCEL') {
          nj.action = ''
        }
        if (action === 'SAVE') {
          if (!!descriptionNewVal.description.length) nj.description = descriptionNewVal.description
          if (!!descriptionNewVal.date.length) nj.date = descriptionNewVal.date
          nj.action = ''
        }
      }
      return nj
    })
    localStorage.setItem('journals', JSON.stringify(newJournalList));
    return setJournalList(newJournalList);
  }

  return (
    <Container
      maxWidth='md'
      style={{ margin: 'auto', alignItems: 'center', alignSelf: 'center', marginTop: 50 }}>
      <Box sx={{
        border: '15px solid grey',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            sx={{ fontFamily: 'Monospace', fontWeight: 'bold', fontStyle: 'underline', fontSize: 25, padding: 25, flex: 1 }}>
            Khang's Journal
          </Box>
          <Button
            onClick={() => handleOnClickJournal(0, 'ADD', { date: '', description: '' })}
            variant="outlined" size='small'
            style={{ marginRight: 10, backgroundColor: '#8c8c8c', marginTop: 10 }}>
            Add Note
          </Button>
        </div>
        <hr />

        {journalList.map((jn) => (
          <JournalDetail
            id={jn.id}
            description={jn.description}
            date={jn.date}
            time={jn.time}
            journalAction={handleOnClickJournal}
            action={jn.action}
          />
        ))
        }
      </Box>
    </Container>
  );
}

export default App;

import { Button, CardActions, CardContent, TextField, Typography } from '@material-ui/core'
import Card from '@mui/material/Card';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Keyboard, Save } from '@mui/icons-material';

type JournalProps = {
    id: number
    description: string,
    date: string,
    time: string,
    journalAction: (id: number, action: string, descriptionNewVal: { date: string, description: string }) => void;
    action: string,

}

const JournalDetail: React.FC<JournalProps> = ({ id, description, date, time, action, journalAction }) => {
    const [descriptionNewVal, setDescriptionNewVal] = useState<{ date: string, description: string }>({ date: '', description: '' })
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const newDescription = { ...descriptionNewVal };
        type === 'date' ? newDescription.date = event.target.value : newDescription.description = event.target.value
        setDescriptionNewVal(newDescription)
    }

    console.log({ descriptionNewVal })

    const displayCardContent = () => {
        if (action === 'add') {
            console.log('in here')
            return (<>
                <TextField id="outlined-basic" label="Date" variant="outlined"
                    onChange={(e: any) => handleDescriptionChange(e, 'date')}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    style={{ width: 700 }}
                    multiline
                    rows={4}
                    defaultValue={''}
                    onChange={(e: any) => handleDescriptionChange(e, 'description')}
                />
            </>)
        }
        return (
            <>
                <Typography gutterBottom variant="h5" component="div">
                    {date}
                </Typography>
                {action !== 'edit' ? <Typography variant="body2">
                    {time} - {description}
                </Typography>
                    :
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        style={{ width: 700 }}
                        multiline
                        rows={4}
                        defaultValue={description}
                        onChange={(e: any) => handleDescriptionChange(e, 'description')}
                    />
                }
            </>
        )
    }

    return (
        // <div key={id}>
        <Card sx={{ maxWidth: 750, marginTop: 10, marginLeft: 10, marginBottom: 15 }} >
            <CardContent>
                {displayCardContent()}
            </CardContent>
            <CardActions style={{ float: 'right' }}>
                <Button size="small" style={{ backgroundColor: 'red', fontFamily: 'Monospace', color: 'white' }}
                    onClick={(e: any) => journalAction(id, e.target.innerText, descriptionNewVal)}
                    startIcon={action !== 'edit' ? <DeleteIcon /> : null}
                >
                    {['edit', 'add'].includes(action) ? 'Cancel' : 'Delete'}
                </Button>
                <Button size="small" style={{ backgroundColor: 'green', fontFamily: 'Monospace', color: 'white' }}
                    startIcon={action === 'edit' ? <Save /> : <Keyboard />}
                    onClick={(e: any) => journalAction(id, e.target.innerText, descriptionNewVal)}
                >
                    {['edit', 'add'].includes(action) ? 'Save' : 'Edit'}
                </Button>
            </CardActions>
        </Card>
        // </div>
    )
}

export default JournalDetail;

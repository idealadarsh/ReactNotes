import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, Container, Typography, Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core/'
import { KeyboardArrowRight } from '@material-ui/icons/'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  }
})

export default function Create() {

  const db = 'ReactNotesDB'
  const classes = useStyles()
  const history = useHistory()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState('todos')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  useEffect(() => {
    const res = localStorage.getItem(db)
    const storageNotes = JSON.parse(res)
    if(storageNotes !== null) setNotes(storageNotes)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if(title === '') setTitleError(true)
    if(details === '') setDetailsError(true)

    if(title && details) {
      const newNote = { id: Math.floor(Math.random() * 10000) + 1,title, details, category }
      const newNotes = [...notes, newNote]
      setNotes(newNotes)
      localStorage.setItem(db, JSON.stringify(newNotes))
      history.push('/')
    }
  }

  return (
    <Container>

      <Typography variant='h6' component='h2' color='textSecondary' gutterBottom>
        Create a New Note
      </Typography>

      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        <TextField onChange={(e) => setTitle(e.target.value)} className={classes.field} label='Note Title' variant='outlined' color='secondary' error={titleError} fullWidth required />
        <TextField onChange={(e) => setDetails(e.target.value)} className={classes.field} label='Note Details' variant='outlined' color='secondary' error={detailsError} rows={4} multiline fullWidth required />
        
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel control={<Radio/>} value='todos' label='Todos' />
            <FormControlLabel control={<Radio/>} value='reminders' label='Reminders' />
            <FormControlLabel control={<Radio/>} value='work' label='Work' />
            <FormControlLabel control={<Radio/>} value='money' label='Money' />
          </RadioGroup>
        </FormControl>

        <Button type='submit' color='secondary' variant='contained' endIcon={<KeyboardArrowRight/>}>Submit</Button>
      </form>

    </Container>
  )
}

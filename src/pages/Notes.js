import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes() {

  const db = 'ReactNotesDB'
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const res = localStorage.getItem(db)
    const storageNotes = JSON.parse(res)
    if(storageNotes !== null) setNotes(storageNotes)
  }, [])

  const deleteNote = async (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    localStorage.setItem(db, JSON.stringify(newNotes))
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry breakpointCols={breakpoints} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
        {notes && notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={deleteNote} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}

import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, Avatar, makeStyles } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { yellow, green, pink, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (note) => {
            if(note.category === 'work') return yellow[700]
            if(note.category === 'money') return green[500]
            if(note.category === 'todos') return pink[500]
            return blue[500]
        }
    },
    deleteicon: {
        color: pink[500],
        '&:hover': {
            color: pink[700]
        }
    }
})

const NoteCard = ({ note, handleDelete }) => {

    const classes = useStyles(note)

    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    action={<IconButton onClick={() => handleDelete(note.id)}><DeleteOutlined className={classes.deleteicon}/></IconButton>}
                    title={note.title}
                    subheader={note.category}
                    avatar={<Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>{ note.details }</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default NoteCard

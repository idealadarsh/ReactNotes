import { makeStyles, AppBar, Toolbar, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountCircleSharp, AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { format } from 'date-fns'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        active: {
            background: '#f4f4f4',
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        }
    }
})

const Layout = ({ children }) => {

    const classes = useStyles()
    const location = useLocation()

    const menuItems = [
        { text: 'My Notes', icon: <SubjectOutlined color='secondary' />, path: '/' },
        { text: 'Create Note', icon: <AddCircleOutlined color='secondary' />, path: '/create' },
    ]

    return (
        <div className={classes.root}>

            <AppBar className={classes.appbar} elevation={1}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the { format(new Date(), 'do MMMM Y') }
                    </Typography>
                    <Typography>
                        Admin
                    </Typography>
                    <AccountCircleSharp/>
                </Toolbar>
            </AppBar>

            <Drawer className={classes.drawer} variant='permanent' anchor='left' classes={{ paper: classes.drawerPaper }}>
                <div>
                    <Typography variant='h5' className={classes.title}>
                        React Notes
                    </Typography>

                    <List>
                        { menuItems.map(item => (
                            <Link to={item.path} key={item.text}>
                                <ListItem button className={location.pathname === item.path ? classes.active : null}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        )) }
                    </List>
                </div>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout

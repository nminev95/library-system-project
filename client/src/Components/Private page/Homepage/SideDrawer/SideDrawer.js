import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, Link, useHistory, useLocation } from 'react-router-dom';
import { MDBFormInline, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBBtn, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBRow } from 'mdbreact';
import AuthContext from '../../Context/AuthContext';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container } from '@material-ui/core';
import swal from 'sweetalert';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const genres = props.genres;
  const { isLoggedIn, setLoginState, user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [state, setState] = useState({
    fantasy: false,
    history: false,
    tragedy: false,
    satire: false,
    horror: false,
    autobiography: false,
  })
  const history = useHistory();

  const toggleCollapse = (ev) => {
    setState((prevState) => !prevState);
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    if (event.target.checked) {
      history.push(`/books?page=1&genre=${event.target.name}`)
    }
    if (!event.target.checked) {
      history.push(`/books?page=1`);
    }
  };

  const handleLogout = () => {

    fetch('http://localhost:4000/signout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer  ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          swal({
            title: "Sorry to see you go! :(",
            text: "You have logged out successfully!",
            icon: "success",
            buttons: false,
            timer: 1500,
          })
        }
      })
    setTimeout(() => {
      localStorage.removeItem("token");
      setLoginState(false);
    }, 1500)
  }

  const url = `/search?query=${search}`
  const path = useLocation().pathname

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon><MenuBookIcon /></ListItemIcon>Genre
      </ListItem>
        <Container>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={state.horror || location.search.includes('horror')} onChange={handleChange} name='horror' color="primary" />}
              label='Horror'
            />
          </ListItem>
        </Container>
        <Container>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={state.fantasy  || location.search.includes('fantasy')} onChange={handleChange} name='fantasy' color="primary" />}
              label='Fantasy'
            />
          </ListItem>
        </Container>
        <Container>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={state.autobiography  || location.search.includes('autobiography')} onChange={handleChange} name='autobiography' color="primary" />}
              label='Autobiography'
            />
          </ListItem>
        </Container>
        <Container>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={state.tragedy || location.search.includes('tragedy')} onChange={handleChange} name='tragedy' color="primary" />}
              label='Tragedy'
            />
          </ListItem>
        </Container>
        <Container>
          <ListItem>
            <FormControlLabel
              control={<Checkbox checked={state.satire || location.search.includes('satire')} onChange={handleChange} name='satire' color="primary" />}
              label='Satire'
            />
          </ListItem>
        </Container>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{ background: "none" }} className={classes.appBar}>
        <Toolbar>
          <MDBNavbarNav right>
            <MDBRow>

              <MDBFormInline>

                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(ev) => setSearch(ev.target.value)}
                  onClick={() => setSearch('')}
                />
                <Link to={url}>
                  <MDBBtn gradient="aqua"
                    rounded size="sm"
                    type="submit"
                    className="mr-auto"
                  ><MDBIcon icon="search"></MDBIcon>
              Search
              </MDBBtn>
                </Link>
              </MDBFormInline>
              <MDBNavItem className="profile" style={{ color: "gray", marginTop: "5px", marginRight: "20px", marginLeft: "10px" }}>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" className="mr-1" />Profile
               </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    {user.role === 'admin' ? (
                      <Link to="/admin/dashboard">
                        <MDBDropdownItem href="#!">Admin panel</MDBDropdownItem>
                      </Link>
                    ) : (null)}
                    <Link to="/profile">
                    <MDBDropdownItem style={{ padding: '10px' }} href="#!">My account</MDBDropdownItem>
                    </Link>
                    <MDBDropdownItem style={{ padding: '10px' }} onClick={() => handleLogout()} href="#!">Log out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBRow>
          </MDBNavbarNav>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

SideDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideDrawer;
import React, { useState } from "react";
import PropTypes from "prop-types";

import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import TocIcon from '@material-ui/icons/Toc';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ThemeSwitch, themeSwitchProp } from "@/components/Theme";
import Search from "@/components/Search";
import About from "@/components/About";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = ({ siteTitle, themeMode }) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const menuList = ['search', 'tags', 'categories', 'timeline', 'about'];
  const getMenuItem = (target) => {
    const ref = React.createRef();

    if (target === 'search') {

      return {
        title: 'Search',
        icon: <SearchIcon />,
        child: <Search ref={ref} />,
        click: () => ref.current.toogle()
      };
    }

    if (target === 'tags') {
      return {
        title: 'Tags',
        icon: <LocalOfferIcon />,
        children: null,
        href: '/tags',
      };
    }

    if (target === 'categories') {
      return {
        title: 'Categories',
        icon: <BookmarkIcon />,
        children: null,
        href: '/categories',
      };
    }

    if (target === 'timeline') {
      return {
        title: 'Timeline',
        icon: <TimelineIcon />,
        children: null,
        href: '/timeline',
      };
    }

    if (target === 'about') {
      return {
        title: 'About',
        icon: <AccountCircle />,
        child: <About ref={ref} />,
        click: () => ref.current.toogle()
      };
    }
  }

  const renderMobileMenu = (
    <Drawer
      anchor={'top'}
      open={!!mobileMoreAnchorEl}
      onClose={handleMobileMenuClose}
      id={mobileMenuId}
      keepMounted
      // open={isMobileMenuOpen}
    >
      <List>
        {
          menuList.map(t => {
            const item = getMenuItem(t);

            return (
              <ListItem button component="a" key={t} onClick={item.click || null} href={item.href || null}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {item.child}
              </ListItem>
            )
          })
        }
      </List>
    </Drawer>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <div className={classes.grow}>
          <AppBar color={'default'}>
            <Toolbar>
              <Typography variant="h6">
                <Link href="/" color="inherit" underline="none">
                  {siteTitle}
                </Link>
              </Typography>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="switch dark mode" color="inherit">
                  <ThemeSwitch mode={themeMode.mode} onChange={themeMode.toggle} />
                </IconButton>
                {menuList.map(t=> {
                  const item = getMenuItem(t);

                  return (
                  <React.Fragment key={t}>
                    <IconButton
                      component="a"
                      aria-label={t}
                      color="inherit"
                      onClick={item.click} href={item.href || null}
                    >
                      <>{item.icon}</>
                    </IconButton>
                    {item.child}
                  </React.Fragment>
                  )})
                }
              </div>
              <div className={classes.sectionMobile}>
              <IconButton aria-label="switch dark mode" color="inherit">
                  <ThemeSwitch mode={themeMode.mode} onChange={themeMode.toggle} />
                </IconButton>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <TocIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </HideOnScroll>
      {renderMobileMenu}
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  themeMode: PropTypes.shape({
    ...themeSwitchProp
  }),
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

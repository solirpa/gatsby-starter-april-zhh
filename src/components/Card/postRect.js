import React from 'react';
import PropTypes from "prop-types";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { openExtendLink } from '@/utils/utils';

import PostCard from './post';

const useStyles = makeStyles(theme => ({
  root: {
    // borderRadius: '.5rem',
    color: '#000',
    width: '40rem',
    height: '15rem',
    margin: 'auto',
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '22rem',
    },
  },
  cardroot: {
    height: '100%',
  },
  details: {
    width: '45%',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    padding: '0 1rem'
  },
  imgCtn: {
    width: '55%',
    height: '100%',
    display: 'inline-block',
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    transition: 'all 0.4s ease-in-out',

    '&:hover': {
      transform: 'scale(1.2)'
    }
  },
  actions: {
    borderTop: `.1rem ${theme.palette.text.disabled} solid`,
    height: '3rem',
    padding: 0,
  },
  content: {
    padding: '.5rem 0',
  },
  contentmain: {
    height: '70%',
  },
  title: {
    fontSize: '1.2rem',
    margin: 0,
    top: '7.5rem',
    color: theme.palette.text.primary
  },
  desc: {
    lineHeight: '1.5em',
    wordBreak: 'break-all',
  },
  clock: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  categore: {
    display: 'inline-flex',
    float: 'right',
    alignItems: 'center',
  },
  subicon: {
    marginRight: '.2rem',
    fontSize: '1rem',
  },
  subinfo: {
    fontSize: '.8rem',
  },
  more: {
    marginLeft: 'auto',
  },
  tag: {
    // backgroundImage: 'linear-gradient(to right, #da8d00 0%,  #e46223 100%)',
    background: theme.palette.background,
    padding: '4px 6px',
    margin: '0 2px',
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '22px',
    color: theme.palette.text.secondary,
    // borderRadius: '10px',
    // padding: '0 10px'
  },
  category: {
    fontSize: '0.8rem',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    zIndex: 1201,
  },
}));

const PostRectCard = (props) => {
  const {
    path,
    image,
    date,
    title,
    description,
    tags = [],
    direction = 'right',
    tagShow = true,
    categories = [],
    categorieShow = true
  } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

  const handleMore = (path) => {
    window.location.href = path;
  }

  return (
    matches ? (
      <Card className={classes.root}>
        <CardActionArea className={classes.cardroot}>
          <div style={{ float: direction, overflow: 'hidden' }} className={classes.imgCtn}>
            <CardMedia
              className={classes.img}
              image={image}
              title="Contemplative Reptile"
              onClick={() => handleMore(path)}
            />
          </div>
          <div className={classes.details} style={{ float: direction }}>
            <CardContent className={classes.content}>
              <Typography className={classes.clock} variant="caption" color="textSecondary" component="span">
                <AccessTimeIcon className={classes.subicon} />
                <span className={classes.subinfo}>{date}</span>
              </Typography>
              {
                categorieShow && categories && categories.length ? (
                  <Typography className={classes.categore} variant="caption" color="textSecondary" component="span">
                    <BookmarkIcon className={classes.subicon} />
                    <Link className={`${classes.subinfo} ${classes.category}`} onClick={() => window.location.href = `/categories/${openExtendLink(categories[0])}`}>{categories[0]}</Link>
                  </Typography>
                ) : null
              }
            </CardContent>
            <CardContent className={`${classes.content} ${classes.contentmain}`} onClick={() => handleMore(path)}>
              <Tooltip title={title} placement="top-end" arrow>
                <Typography className={classes.title} gutterBottom variant="h5" color="textPrimary" component="h1">
                  {title.length >= 15 ? title.substring(0, 15) + '...' : title}
                </Typography>
              </Tooltip>
              <Typography className={classes.desc} variant="body2" color="textSecondary" component="span">
                {description && description.length >= 100 ? description.substring(0, 100) + '...' : description}
              </Typography>
            </CardContent>
            {
              tagShow ? (
                <CardActions className={classes.actions} disableSpacing>
                  {
                    tags && tags.slice(0, 3).map(tag => (
                      <Link key={tag} className={classes.tag} onClick={() => window.location.href = `/tags/${openExtendLink(tag)}`}>{tag}</Link>
                    ))
                  }
                </CardActions>
              ) : null
            }
          </div>
        </CardActionArea>
      </Card>
    ) : <PostCard {...props} />
  )
}

PostRectCard.propTypes = {
  direction: PropTypes.oneOf(['right', 'left']),
  path: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  categories: PropTypes.array,
  tagShow: PropTypes.bool,
  categorieShow: PropTypes.bool,
}

export default PostRectCard;

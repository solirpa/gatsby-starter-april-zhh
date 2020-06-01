import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    // borderRadius: '.5rem',
    color: '#000',
    // width: '25rem',
    margin: 'auto',
    marginBottom: '2rem',

    [theme.breakpoints.up('md')]: {
      maxWidth: '20rem',
      margin: '0',
      marginBottom: '2rem',
    },
  },
  imgCtn: {
    height: '10rem',
    overflow: 'hidden',
  },
  img: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    // borderRadius: '.5rem .5rem 0 0',
    transition: 'all 0.4s ease-in-out',

    '&:hover': {
      transform: 'scale(1.2)'
    }
  },
  actions: {
    borderTop: `.1rem ${theme.palette.text.disabled} solid`,
    height: '3rem'
  },
  content: {
    padding: '.5rem',
  },
  title: {
    fontSize: '1.2rem',
    margin: 0,
    position: 'absolute',
    top: '7.5rem',
    color: 'white',
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
    borderRadius: '10px',
    // padding: '0 10px'
  },
  category: {
    fontSize: '0.8rem',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    zIndex: 1201,
  },
}));

const PostCard = ({
  path,
  image,
  date,
  title,
  description,
  tags = [],
  tagShow = true,
  categories = [],
  categorieShow = true
}) => {
  const classes = useStyles();

  const handleMore = (path) => {
    window.location.href = path;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.imgCtn}>
        <CardMedia
          className={classes.img}
          image={image}
          title="Contemplative Reptile"
          onClick={() => handleMore(path)}
        />
        </div>
        <CardContent className={classes.content} onClick={() => handleMore(path)}>
          <Tooltip title={title} placement="top-end" arrow>
            <Typography className={classes.title} gutterBottom variant="h5" color="textPrimary" component="h1">
              {title.length >= 15 ? title.substring(0, 15) + '...' : title}
            </Typography>
          </Tooltip>
          <Typography className={classes.desc} variant="body2" color="textSecondary" component="span">
            {description && description.length >= 100 ? description.substring(0, 100) + '...' : description}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography className={classes.clock} variant="caption" color="textSecondary" component="span">
            <AccessTimeIcon className={classes.subicon} />
            <span className={classes.subinfo}>{date}</span>
          </Typography>
          {
            categories && categories.length ? (
              <Typography className={classes.categore} variant="caption" color="textSecondary" component="span">
                <BookmarkIcon className={classes.subicon} />
                <Link className={`${classes.subinfo} ${classes.category}`} onClick={() => window.location.href = `/categories/${openExtendLink(categories[0])}`}>{categories[0]}</Link>
              </Typography>
            ) : null
          }
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
      </CardActionArea>
    </Card>
  )
}

PostCard.propTypes = {
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

export default PostCard;

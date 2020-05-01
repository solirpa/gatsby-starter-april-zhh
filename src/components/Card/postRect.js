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

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '.5rem',
    color: '#000',
    width: '40rem',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '25rem',
    },
  },
  img: {
    objectFit: 'cover',
    height: '10rem',
    width: '100%',
    display: 'block',
    borderRadius: '.5rem .5rem 0 0',
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
    backgroundImage: 'linear-gradient(to right, #da8d00 0%,  #e46223 100%)',
    padding: '4px',
    margin: '0 2px',
    fontSize: '0.8rem',
    fontWeight: '400',
    lineHeight: '22px',
    color: '#fff',
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

const PostRectCard = ({
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
        <CardMedia
          className={classes.img}
          image={image}
          title="Contemplative Reptile"
          onClick={() => handleMore(path)}
        />
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
                <Link className={`${classes.subinfo} ${classes.category}`} onClick={() => window.location.href = `/categories/${categories[0]}`}>{categories[0]}</Link>
              </Typography>
            ) : null
          }
        </CardContent>
        {
          tagShow ? (
            <CardActions className={classes.actions} disableSpacing>
              {
                tags && tags.slice(0, 3).map(tag => (
                  <Link key={tag} className={classes.tag} onClick={() => window.location.href = `/tags/${tag}`}>{tag}</Link>
                ))
              }
            </CardActions>
          ) : null
        }
      </CardActionArea>
    </Card>
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
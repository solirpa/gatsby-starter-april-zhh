import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  tag: {
    color: 'black',
    paddingLeft: '15px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, .12)',

    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #4cbf30 0%, #0f9d58 100%) !important',
    }
  },
  select: {
    color: '#fff',
    background: 'linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%) !important',
  }
}));

const TagChip = ({ name, count, colors, select }) => {
  const classes = useStyles();

  return (
    <Chip
      style={{ background: colors[Math.floor(Math.random() * colors.length)] }}
      className={`${classes.tag} ${select ? classes.select : ''}`}
      label={`${name} ${count}`}
      clickable={true}
      onClick={() => window.location.href = `/tags/${name}?t=wall`}
    />
  )
};

TagChip.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.array,
  select: PropTypes.bool,
};

TagChip.defaultProps = {
  count: '',
};

export default TagChip;

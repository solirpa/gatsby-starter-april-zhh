import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import TagChip from './chip';

const useStyles = makeStyles(theme => ({
  headerTag: {
    height: '26px',
    lineHeight: '24px',
    margin: '10px 15px',
    padding: '0 10px 0 12px',
    textDecoration: 'none',
    position: 'relative',

    '&:after': {
      content: '" "',
      position: 'absolute',
      top: '15px',
      left: '25px',
      width: '4px',
      height: '4px',
      borderRadius: '2px',
      background: '#fff',
      boxShadow: '-1px -1px 2px #004977',
    },
  },
}));

const tagColors = [
  // '#1f77b4',
  // '#ff7f0e',
  // '#2ca02c',
  // '#d62728',
  // '#9467bd',
  // '#8c564b',
  '#f8f9f9',
  '#82e0aa',
  '#f9e79f',
  '#85c1e9',
  '#f5eef8',
  '#e8f8f5',
  '#f9ebea',
];

const TagWall = ({ tags = [], select }) => {
  const classes = useStyles();

  return (
    tags && tags.map(item => (
      <div key={item.text} className={classes.headerTag}>
        <TagChip name={item.text} count={item.value} colors={tagColors} select={item.text === select} />
      </div>
    ))
  )
}

TagWall.propTypes = {
  tags: PropTypes.array,
  select: PropTypes.string,
};

export default TagWall;

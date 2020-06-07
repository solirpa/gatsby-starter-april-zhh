import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  data: {
    color: 'black',
    paddingLeft: '15px',
    boxShadow: '0 3px 5px rgba(0, 0, 0, .12)',

    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #da8d00 0%, #e46223 100%) !important',
    }
  },
  select: {
    color: '#fff',
    background: 'linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%) !important',
  }
}));

interface TabProps { 
  name: string;
  count: number;
  colors: string[];
  onClick: any;
  select: boolean;
}

const Tab: FC<TabProps> = ({ name, count = 0, colors, onClick, select }) => {
  const classes = useStyles();

  return (
    <Chip
      style={{ background: colors[Math.floor(Math.random() * colors.length)] }}
      className={`${classes.data} ${select ? classes.select : ''}`}
      label={`${name} ${count}`}
      clickable={true}
      onClick={()=> onClick()}
    />
  )
};

export default Tab;

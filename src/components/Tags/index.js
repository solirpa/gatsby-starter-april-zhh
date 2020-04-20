import React from 'react';
import PropTypes from 'prop-types';

import TagWall from './wall';
import TagCloud from './cloud';

const Tags = ({ type, select, tags }) => {

  return (
    type === 'cloud' ? <TagCloud tags={tags} /> : <TagWall tags={tags} select={select} />
  )
}

Tags.propTypes = {
  type: PropTypes.oneOf(['wall', 'cloud']),
  select: PropTypes.string,
  tags: PropTypes.array,
};

export default Tags;

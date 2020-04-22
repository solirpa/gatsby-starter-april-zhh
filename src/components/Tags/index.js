import React from 'react';
import PropTypes from 'prop-types';

import TagWall from '@/components/Card/wall';
import TagCloud from '@/components/Card/cloud';

const Tags = ({ type, select, tags }) => {

  return (
    type === 'cloud' ? <TagCloud datas={tags} link="tags" /> : <TagWall datas={tags} link="tags" select={select} />
  )
}

Tags.propTypes = {
  type: PropTypes.oneOf(['wall', 'cloud']),
  select: PropTypes.string,
  tags: PropTypes.array,
};

export default Tags;

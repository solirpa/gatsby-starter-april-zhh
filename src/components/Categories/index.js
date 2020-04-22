import React from 'react';
import PropTypes from 'prop-types';

import CategoryWall from '@/components/Card/wall';
import CategoryRadar from '@/components/Card/radar';

const Categories = ({ type, select, categories }) => {

  return (
    type === 'radar' ? <CategoryRadar datas={categories} link="categories" /> : <CategoryWall datas={categories} link="categories" select={select} />
  )
}

Categories.propTypes = {
  type: PropTypes.oneOf(['wall', 'radar']),
  select: PropTypes.string,
  categories: PropTypes.array,
};

export default Categories;

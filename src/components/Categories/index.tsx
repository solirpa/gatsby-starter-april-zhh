import React, { FC } from 'react';

import CategoryWall from '@/components/Card/wall';
import CategoryRadar from '@/components/Card/radar';

interface CategoriesProps { 
  type: 'wall' | 'radar';
  select?: string;
  categories: any[];
}

const Categories: FC<CategoriesProps> = ({ type, select, categories }) => {

  return (
    type === 'radar' ? <CategoryRadar datas={categories} /> : <CategoryWall datas={categories} link="categories" select={select} />
  )
}

export default Categories;

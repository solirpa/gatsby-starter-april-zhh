import React, { FC } from 'react';

import TagWall from '@/components/Card/wall';
import TagCloud from '@/components/Card/cloud';

interface TagsProps { 
  type: 'wall' | 'cloud';
  select?: string;
  tags: any[];
}

const Tags: FC<TagsProps> = ({ type, select, tags }) => {

  return (
    type === 'cloud' ? <TagCloud datas={tags} link="tags" /> : <TagWall datas={tags} link="tags" select={select} />
  )
}

export default Tags;

import React, { FC } from 'react';

import ReactWordcloud, { Word } from 'react-wordcloud';
import { select } from 'd3-selection';

import { openExtendLink } from '@/utils/utils';

const wordCloudColors = [
  '#82e0aa',
  '#f9e79f',
  '#85c1e9',
];

interface CloudProps { 
  datas: any[];
  link: string;
}

const Cloud: FC<CloudProps> = ({ datas = [], link }) => {

  const getCallback: (n: string)=> ((word: Word, event?: MouseEvent | undefined) => void) = callbackName => (word, event) => {
    const isActive = callbackName !== 'onWordMouseOut';
    const element: any = (event as MouseEvent).target;
    const text: any = select(element);
    text
      .on('click', () => {
        if (isActive) {
          window.location.href = `/${link}/${openExtendLink(word.text)}?t=cloud`;
        }
      })
      .transition()
      .attr('background', 'white')
      .attr('text-decoration', isActive ? 'underline' : 'none')
  }

  const archimedeanSpiral = (size: number[]) => {
    const e = size[0] / size[1];
    return function (t: any) {
      return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)];
    }
  }

  return (
    <ReactWordcloud
      options={{
        colors: wordCloudColors,
        enableTooltip: true,
        deterministic: false,
        fontFamily: 'impact',
        fontSizes: [20, 40],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 3,
        rotations: 3,
        rotationAngles: [0, 0],
        scale: 'sqrt',
        // spiral: archimedeanSpiral,
        spiral: "archimedean",
        transitionDuration: 100,
      }}
      callbacks={{
        onWordClick: getCallback('onWordClick'),
        onWordMouseOut: getCallback('onWordMouseOut'),
        onWordMouseOver: getCallback('onWordMouseOver'),
      }}
      words={datas}
    />
  )
}

export default Cloud;

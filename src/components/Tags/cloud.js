import React from 'react';
import PropTypes from 'prop-types';

import ReactWordcloud from 'react-wordcloud';
import { select } from 'd3-selection';

const wordCloudColors = [
  '#82e0aa',
  '#f9e79f',
  '#85c1e9',
];

const TagCloud = ({ tags = [] }) => {

  const getCallback = callbackName => (word, event) => {
    const isActive = callbackName !== 'onWordMouseOut';
    const element = event.target;
    const text = select(element);
    text
      .on('click', () => {
        if (isActive) {
          window.location.href = `/tags/${word.text}?t=cloud`;
        }
      })
      .transition()
      .attr('background', 'white')
      .attr('text-decoration', isActive ? 'underline' : 'none')
  }

  const archimedeanSpiral = (size) => {
    const e = size[0] / size[1];
    return function (t) {
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
        rotationAngles: [0],
        scale: 'sqrt',
        spiral: archimedeanSpiral,
        transitionDuration: 100,
      }}
      callbacks={{
        onWordClick: getCallback('onWordClick'),
        onWordMouseOut: getCallback('onWordMouseOut'),
        onWordMouseOver: getCallback('onWordMouseOver'),
      }}
      words={tags}
    />
  )
}

TagCloud.propTypes = {
  tags: PropTypes.array,
};

export default TagCloud;

import React, { useState, useEffect } from 'react';

// @ts-ignore
import Progress from 'scrollprogress';

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    display: 'none',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  rail: {
    height: 4,
    borderRadius: 0,
  },
})(Slider);

const ScrollProgress = ()=> {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressObserver = new Progress((_: any, y: number) => {
      setProgress(y * 100);
    })

    return () => {
      progressObserver.destroy()
    }
  }, [progress]);

  return (
    <PrettoSlider
      style={{
        height: '10px',
        position: 'fixed',
        padding: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
      value={progress}
      min={0}
      max={100}
      // thumb={<span />}
    />
  )
}

export default ScrollProgress;

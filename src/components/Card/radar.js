import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';

// import * as echarts from 'echarts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const Radar = ({ datas = [] }) => {
  const theme = useTheme();

  useEffect(() => {
    if (datas.length) {
      const radarChart = echarts.init(document.getElementById('echarts-radar'));

      // Find the maximum and average values of the post categories.
      const radarValueArr = [];
      datas.forEach(item => {
        radarValueArr.push(item.value);
      });
      const max = Math.max.apply(null, radarValueArr) + Math.min.apply(null, radarValueArr);
      // Calculate the data needed for the radar chart.
      const indicatorArr = [];
      datas.forEach(item => {
        indicatorArr.push({ 'name': item.text, 'max': max });
      });

      const option = {
        title: {
          left: 'center',
          text: '文章分类雷达图',
          textStyle: {
            color: '#9e9e9e',
            fontWeight: 500,
            fontSize: 22
          }
        },
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: theme.palette.text.main,
            }
          },
          indicator: indicatorArr,
          nameGap: 5,
          center: ['50%', '55%'],
          radius: '66%'
        },
        series: [{
          type: 'radar',
          color: ['#3ecf8e'],
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              value: radarValueArr,
              name: `${datas.length}`
            }
          ]
        }]
      };

      radarChart.setOption(option);
    }
  }, [datas, theme]);

  return (
    <>
      <div id="echarts-radar" style={{ height: '360px' }} />
    </>
  )
}

Radar.propTypes = {
  datas: PropTypes.array,
};

export default Radar;

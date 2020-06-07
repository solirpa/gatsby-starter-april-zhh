import React, { FC, useEffect } from 'react';

import { useTheme } from '@material-ui/core/styles';

// import * as echarts from 'echarts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

interface RadarProps { 
  datas: any[];
}

const Radar: FC<RadarProps> = ({ datas = [] }) => {
  const theme = useTheme();

  useEffect(() => {
    if (datas.length) {
      const radarChart = echarts.init(document.getElementById('echarts-radar') as HTMLDivElement);

      // Find the maximum and average values of the post categories.
      const radarValueArr: number[] = [];
      datas.forEach(item => {
        radarValueArr.push(item.value);
      });
      const max = Math.max.apply(null, radarValueArr) + Math.min.apply(null, radarValueArr);
      // Calculate the data needed for the radar chart.
      const indicatorArr: { name: string; max: number; }[] = [];
      datas.forEach(item => {
        indicatorArr.push({ 'name': item.text, 'max': max });
      });

      const option: any = {
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
              color: theme.palette.text.primary,
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

export default Radar;

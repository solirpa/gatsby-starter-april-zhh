import React, { FC, useEffect, useMemo } from 'react';
import { graphql } from 'gatsby';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';

// import * as echarts from 'echarts';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/calendar';
import 'echarts/lib/component/axis';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import dayjs from 'dayjs';

// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import useConfig from '@/components/Config';

import { getRandom } from '@/utils/utils';

import Layout from '@/components/Layout/layout';
import BackGround from "@/components/Layout/background";
import PostCard from '@/components/Card/post';

import './timeline.less';

const useStyles = makeStyles(theme => ({
  tlRoot: {
    // overflow: 'hidden',

    '& .vertical-timeline::before': {
      background: theme.palette.success.main,
      top: '3rem',
    }
  },
  verticalTlRoot: {
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      overflow: 'unset',
    },
    padding: '0 0 2rem 0',
  },
  iconCtn: {
    color: 'white',
    top: '28%',
    position: 'relative',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      top: '30%',
    },
  },
  backgroundiv: {
    height: '50vh',
    overflow: 'hidden',
    backgroundPositionY: '-25rem',
    // boxShadow: '8px 10px 20px 10px rgba(19, 19, 0, 0.5), -3px 5px 10px 1px rgba(255,255,255,0.5)'
  },
  paper: {
    padding: '1rem',
    position: 'relative',
    top: '-3rem',
  },
}));


interface TimelinePageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            path: string;
          };
          frontmatter: {
            date: string;
            title: string;
            tags: string[];
            description?: string;
            categories: string[];
            image?: string;
          };
        };
      }[];
    }
  }
}

const TimelinePage: FC<TimelinePageProps> = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { getDefaultImg } = useConfig();
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const matchesUp = useMediaQuery('(min-width:1170px)');
  const { allMarkdownRemark } = data;

  const timeline = useMemo(() => {
    const _timeline: any = {};
    allMarkdownRemark.edges.forEach(({ node }) => {
      const { frontmatter, fields: { path } } = node;
      const o = new Date(frontmatter.date);

      const year = o.getFullYear();
      const month = o.getMonth() + 1;
      const day = o.getDate();

      _timeline[year] = _timeline[year] || {};

      _timeline[year][month] = _timeline[year][month] || {};
      _timeline[year][month][day] = _timeline[year][month][day] || [];

      _timeline[year][month][day].push({
        timestamp: o.getTime(),
        formatDate: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
        ...frontmatter,
        image: frontmatter.image || getRandom(getDefaultImg()),
        path,
      });
    });

    return _timeline;
  }, [allMarkdownRemark.edges])

  useEffect(() => {
    const myChart = echarts.init(document.getElementById('echarts') as HTMLDivElement);

    const startDate = dayjs().subtract(1, 'year');
    const endDate = dayjs();
    const rangeArr = [startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')];

    const dateMap = new Map();
    // post and count map.
    for (let y of Object.keys(timeline)) {
      for (let m of Object.keys(timeline[y])) {
        for (let d of Object.keys(timeline[y][m])) {
          dateMap.set(timeline[y][m][d][0][`formatDate`], timeline[y][m][d].length);
        }
      }
    }

    const datePosts = [];
    const dayTime = 3600 * 24 * 1000;
    for (let time = Number(startDate); time <= Number(endDate); time += dayTime) {
      const date = dayjs(time).format('YYYY-MM-DD');
      datePosts.push([
        date,
        dateMap.has(date) ? dateMap.get(date) : 0,
      ]);
    }

    myChart.setOption({
      title: {
        show: true,
        left: 'center',
        text: '文章日历',
        textStyle: {
          color: '#9e9e9e',
        }
      },
      dataZoom: [{
        show: false,
        type: 'slider',
        realtime: false,
        bottom: 0
      }],
      tooltip: {
        padding: 10,
        backgroundColor: '#555',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj: { value: [number, number] }) {
          const value = obj.value;
          return '<div style="font-size: 14px;">' + value[0] + '：' + value[1] + '</div>';
        }
      },
      visualMap: {
        show: false,
        showLabel: true,
        categories: [0, 1, 2, 3, 4],
        calculable: true,
        inRange: {
          symbol: 'rect',
          color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        },
        itemWidth: 12,
        itemHeight: 12,
        orient: 'horizontal',
        left: 'center',
        bottom: 0
      },
      calendar: [{
        left: 'center',
        range: rangeArr,
        cellSize: [13, 13],
        splitLine: {
          show: false
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          padding: 3,
        },
        yearLabel: {
          show: false
        },
        monthLabel: {
          fontSize: 11,
          color: '#9e9e9e',
        },
        dayLabel: {
          formatter: '{start}  1st',
          fontSize: 11,
          color: '#9e9e9e',
        }
      }],
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: datePosts
      }
    } as any);
  }, [theme.palette.text.secondary, timeline]);

  return (
    <Layout>
      <BackGround type="home" />
      <Container className={classes.tlRoot} maxWidth="md">
        <Paper elevation={3} className={`${classes.paper}`}>
          <div>
            <div id="echarts" style={{ height: '10rem' }} />
          </div>
        </Paper>
        <NoSsr>
          <VerticalTimeline className={classes.verticalTlRoot}>
            {
              // year
              Object.keys(timeline).sort((a, b) => Number(b) - Number(a)).map(y => (
                <React.Fragment key={y}>
                  <VerticalTimelineElement
                    style={{
                      margin: '60px 0 50px -20px',
                    }}
                    iconStyle={{
                      width: '80px',
                      height: '80px',
                      padding: '21px 10px',
                      color: '#fff',
                      fontWeight: 1000,
                      background: '#ff5722',
                      top: '-1.5rem',
                    }}
                    icon={
                      <div className={classes.iconCtn} style={{ top: '28%' }}>
                        {y}
                      </div>
                    }
                  />
                  {
                    // month
                    Object.keys(timeline[y]).sort((a, b) => Number(b) - Number(a)).map(m => {

                      return (
                        <React.Fragment key={`${y}-${m}`}>
                          <VerticalTimelineElement
                            style={{
                              left: '.5rem',
                              top: '1.5rem',
                              margin: '10px 0 30px -20px',
                            }}
                            iconStyle={{
                              width: '60px',
                              height: '60px',
                              padding: '21px 10px',
                              color: '#fff',
                              fontWeight: 800,
                              background: '#ef6c00',
                              top: '-0.6rem',
                            }}
                            icon={
                              <div className={classes.iconCtn} style={{ top: 0 }}>
                                {m}
                              </div>
                            }
                          />
                          {
                            // day
                            Object.keys(timeline[y][m]).sort((a, b) => Number(b) - Number(a)).map(d => {
                              return (
                                timeline[y][m][d].sort((a: any, b: any) => b.timestamp - a.timestamp).map((item: any) => (
                                  <React.Fragment key={`${item.title}`}>
                                    <VerticalTimelineElement
                                      // className={classes.verticalContent}
                                      style={{
                                        left: matchesUp ? '0.5rem' : 0,
                                        top: '1rem'
                                      }}
                                      iconStyle={{
                                        width: '40px',
                                        height: '40px',
                                        padding: '21px 10px',
                                        color: 'white',
                                        fontWeight: 800,
                                        background: '#ffa726',
                                        // zIndex: 1200
                                      }}
                                      contentStyle={{
                                        background: '#ffffff00',
                                        boxShadow: '0 0',
                                        right: '0.3rem',
                                        position: 'absoulte',
                                        padding: 0,
                                      }}
                                      contentArrowStyle={{
                                        borderColor: '#ffa726',
                                        content: '',
                                        height: 0,
                                        width: '32px',
                                        border: '1px dashed #ffa726',
                                        zIndex: 1001,
                                      }}
                                      icon={
                                        <div className={classes.iconCtn} style={{ top: '-.5rem' }}>
                                          {d}
                                        </div>
                                      }
                                    // onTimelineElementClick={() => window.location.href = item.path}
                                    >
                                      <PostCard
                                        path={item.path}
                                        image={item.image}
                                        date={item.formatDate}
                                        title={item.title}
                                        description={item.description}
                                        tags={item.tags}
                                        categories={item.categories}
                                      />
                                    </VerticalTimelineElement>
                                  </React.Fragment>
                                ))

                              )
                            })
                          }
                        </React.Fragment>
                      )
                    })
                  }
                </React.Fragment>
              ))
            }
          </VerticalTimeline>
        </NoSsr>
      </Container>
    </Layout>
  )
}

export default TimelinePage;

export const pageQuery = graphql`
  query getAllDate {
    allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            date
            title
            tags
            description
            categories
            image
          }
        }
      }
    }
  }
`;

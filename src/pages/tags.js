import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';

import Layout from '@/components/Layout/layout';
import BackGround from "@/components/Layout/background";
import Tags from '@/components/Tags';

const useStyles = makeStyles(theme => ({
  tagCtn: {
    // display: 'flex',
    display: '-webkit-flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  paperTop: {
    marginBottom: '3rem',
  }
}));

const TagsPage = ({ data }) => {
  const classes = useStyles();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const tagMap = new Map();
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { tags = [] } = node.frontmatter;

      tags && tags.forEach((name) => {
        if (tagMap.has(name)) {
          tagMap.set(name, tagMap.get(name) + 1);
        } else {
          tagMap.set(name, 1);
        }
      });
    });

    const t = Array.from(tagMap.keys()).map(tag => ({
      text: tag,
      value: tagMap.get(tag)
    }));

    setTags([...t]);
  }, [data]);


  return (
    <Layout>
      <BackGround type="home" />
      <Container>
        <NoSsr>
          <Paper elevation={3} className={`${classes.paper} ${classes.paperTop} ${classes.tagCtn}`}>
            <Tags tags={tags} type="wall" />
          </Paper>

          <Paper elevation={3} className={classes.paper}>
            <Tags tags={tags} type="cloud" />
          </Paper>
        </NoSsr>
      </Container>
    </Layout>
  )
}

export default TagsPage;

export const pageQuery = graphql`
  query getAllTags {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;


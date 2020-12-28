import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import SectionContainer from '../components/SectionContainer';
import SectionHeader from '../components/SectionHeader';
import SEO from '../components/SEO';
import WhiteBox from '../components/WhiteBox';
import rssSvg from '../icons/rss.svg';
import { rhythm } from '../utils/typography';

const propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object,
  }).isRequired,
};

const BlogPage = ({ data, location }) => {
  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      position: 'relative',
    },
    rssLink: {
      display: 'block',
      position: 'absolute',
      right: 0,
      top: '-2rem',
      ' img': {
        width: '1.5rem',
      },
    },
    boxInner: {
      padding: rhythm(1),
    },
    link: {
      display: 'block',
      textDecoration: 'none',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.3rem',
      margin: 0,
      marginBottom: '1rem',
      textAlign: 'left',
    },
    datetime: {
      color: '#999',
      display: 'block',
      fontSize: '0.8rem',
    },
  };

  const rssPath = '/rss.xml';

  return (
    <Layout location={location}>
      <SectionContainer colorNumber="1" isTop>
        <SectionHeader colorNumber="1" text="Yuuniworks Blog" />
        <div css={styles.container}>
          <a href={rssPath} css={styles.rssLink}>
            <img src={rssSvg} alt="rss" />
          </a>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link
              to={`/blog${node.fields.slug}`}
              css={styles.link}
              key={node.frontmatter.title}
            >
              <WhiteBox hover>
                <article css={styles.boxInner}>
                  <h1 css={styles.title}>{node.frontmatter.title}</h1>
                  <time css={styles.datetime} dateTime={node.frontmatter.date}>
                    {node.frontmatter.date.slice(0, 10)}
                  </time>
                </article>
              </WhiteBox>
            </Link>
          ))}
        </div>

        <SEO
          metaData={{
            title: 'Yuuniworks Blog',
            description:
              '島根のフルスタックエンジニア「Yuuniworks」のブログです。技術的なネタを記録しています。',
          }}
        />

        <Helmet
          link={[
            {
              rel: 'alternate',
              type: 'application/atom+xml',
              href: rssPath,
              title: 'RSS for Yuuniworks Blog',
            },
          ]}
        />
      </SectionContainer>
    </Layout>
  );
};

BlogPage.propTypes = propTypes;

export default BlogPage;

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

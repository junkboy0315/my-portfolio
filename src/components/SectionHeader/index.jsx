import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  colorNumber: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  subText: PropTypes.string,
};

const defaultProps = {
  colorNumber: null,
  text: null,
  link: null,
  subText: '',
};

const SectionHeader = ({ colorNumber, text, link, subText }) => {
  const colors = {
    1: '#262626',
    2: '#ffffff',
  };
  const charColor = colors[colorNumber] || 'initial';

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '50px',
    },
    h2: {
      color: charColor,
    },
    hr: {
      backgroundColor: charColor,
      height: '3px',
      width: '54px',
    },
    link: {
      color: charColor,
      textDecoration: 'none',
    },
    subText: {
      color: '#777',
      fontSize: '.8rem',
    },
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.h2}>
        {link ? (
          <Link to={link} css={styles.link}>
            {text}
          </Link>
        ) : (
          text
        )}
      </h2>
      <hr css={styles.hr} />
      {subText && <div style={styles.subText}>{subText}</div>}
    </div>
  );
};

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader;

import PropTypes from 'prop-types';
import React from 'react';
import awsClfPng from '../../images/aws_clf.png';
import awsSaaPng from '../../images/aws_saa.png';

const propTypes = {
  cclaimBadgeId: PropTypes.string.isRequired,
  certType: PropTypes.oneOf(['saa', 'clf']).isRequired,
};

const defaultProps = {};

const AwsBadge = props => {
  const { cclaimBadgeId, certType } = props;

  const styles = {
    anchor: {
      cursor: 'pointer',
      display: 'inline-block',
    },
    image: {
      width: '100%',
    },
  };

  let imgSrc;
  switch (certType) {
    case 'saa': {
      imgSrc = awsSaaPng;
      break;
    }
    case 'clf': {
      imgSrc = awsClfPng;
      break;
    }
    default: {
      // eslint-disable-next-line
      console.warn('invalid cert type');
    }
  }

  return (
    <a
      css={styles.anchor}
      href={`https://www.youracclaim.com/badges/${cclaimBadgeId}/public_url`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <img src={imgSrc} css={styles.image} alt="AWS Logo" />
    </a>
  );
};

AwsBadge.propTypes = propTypes;
AwsBadge.defaultProps = defaultProps;

export default AwsBadge;

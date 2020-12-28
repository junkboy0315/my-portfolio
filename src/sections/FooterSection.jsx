import PropTypes from 'prop-types';
import React from 'react';
import SectionContainer from '../components/SectionContainer';
import SectionHeader from '../components/SectionHeader';
import svgForm from '../icons/footer-form.svg';
import svgGithub from '../icons/footer-github.svg';
import svgMail from '../icons/footer-mail.svg';
import svgPin from '../icons/footer-pin.svg';
import { rhythm } from '../utils/typography';

const FooterSection = (props) => {
  const footerInfo = [
    {
      imgPath: svgForm,
      description: 'フォームでのお問い合わせ',
      onClick: () => props.setCurrentModal('CONTACT'),
    },
    {
      imgPath: svgMail,
      description: 'info@yuuniworks.com',
      link: 'mailto:info@yuuniworks.com',
    },
    {
      imgPath: svgGithub,
      description: 'github.com/junkboy0315',
      link: 'https://github.com/junkboy0315/',
    },
    {
      imgPath: svgPin,
      description: '島根県浜田市長沢町',
      link: 'https://goo.gl/maps/52rwLFoSCNA2',
    },
  ];

  const styles = {
    container: {
      display: 'grid',
      gridColumnGap: rhythm(1),
      gridTemplateColumns: '250px',
      justifyContent: 'center',
      margin: 'auto',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
    },
    ItemContainer: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      height: rhythm(5 / 2),
    },
    image: {
      width: '30px',
      height: '30px',
    },
    description: {
      color: '#fff',
      marginBottom: 0,
      paddingLeft: rhythm(1 / 2),
    },
  };

  return (
    <SectionContainer
      id="contact"
      colorNumber="2"
      skew
      skewFillBottom
      fadeOnAppear
    >
      <SectionHeader text="お問い合わせ・ご連絡先" colorNumber="2" />

      <div css={styles.container}>
        {footerInfo.map((info) => (
          <a
            href={info.link || null}
            onClick={info.onClick || null}
            css={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            key={info.description}
          >
            <div css={styles.ItemContainer}>
              <img src={info.imgPath} css={styles.image} alt="" />
              <p css={styles.description}>{info.description}</p>
            </div>
          </a>
        ))}
      </div>
    </SectionContainer>
  );
};

FooterSection.propTypes = {
  setCurrentModal: PropTypes.func.isRequired,
};

export default FooterSection;

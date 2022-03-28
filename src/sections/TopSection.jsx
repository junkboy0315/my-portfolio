import React, { useEffect, useState } from 'react';
import { Link as LinkForScroll } from 'react-scroll';
import Fade from '../components/Fade';
import IconExtLink from '../components/IconExtLink';
import Logo from '../components/Logo';
import arrowSvg from '../icons/arrow.svg';
import topImageJpg from '../images/top-image.jpg';
import { useWindowSize } from '../utils/useWindowSize';
import myStyles from './TopSection.module.css';

const TopSection = () => {
  const [isTopImageLoaded, setIsTopImageLoaded] = useState(false);

  const { height: windowInnerHeight } = useWindowSize({
    ignoreHeightChange: true,
  });

  const styles = {
    // NOTE: css modulesにもスタイルを書いているので注意
    container: {
      alignItems: 'center',
      background: `#6292F1 url("${topImageJpg}") no-repeat center center`,
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      height: `${windowInnerHeight}px`,
      justifyContent: 'center',
      paddingTop: '40px',
    },
    logo: {
      width: '450px',
      maxWidth: '80%',
      marginBottom: '1.45rem',
    },
    description: {
      color: '#fff',
      textAlign: 'center',
    },
    arrow: {
      bottom: 0,
      cursor: 'pointer',
      marginBottom: '54px',
      position: 'absolute',
      width: '65px',
      animation: 'downArrow 0.8s ease-out infinite',
      padding: '10px',
    },
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsTopImageLoaded(true);
    };
    img.src = topImageJpg;
  }, []);

  return isTopImageLoaded ? (
    <section id="top" css={styles.container} className={myStyles.container}>
      <div css={styles.logo}>
        <Logo />
      </div>
      <Fade delayMs={1000} durationMs={300}>
        <div css={styles.description}>
          田村翔太と申します。
          <br />
          <a
            href="https://goo.gl/maps/HjyoY7NJ9j92"
            css={{ color: 'white' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            島根県浜田市
            <IconExtLink color="#fff" />
          </a>
          を拠点に活動する
          <br />
          フルスタックエンジニアです。
        </div>
      </Fade>
      <Fade delayMs={1000} durationMs={300} css={styles.arrow}>
        <LinkForScroll to="gaiyou" smooth duration={150} offset={-50}>
          <img src={arrowSvg} alt="下向きの矢印" />
        </LinkForScroll>
      </Fade>
    </section>
  ) : (
    <div style={{ height: '100vh', background: '#6292F1' }} />
  );
};

export default TopSection;

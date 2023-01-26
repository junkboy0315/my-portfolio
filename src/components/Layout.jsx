import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faCaretSquareRight,
  faExternalLinkAlt,
  faStar,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import RipIe from './RipIe';

gsap.registerPlugin(ScrollTrigger);

library.add(
  faArrowLeft,
  faCaretSquareRight,
  faExternalLinkAlt,
  faStar,
  faStarEmpty,
  faTimesCircle,
);

const TemplateWrapper = ({ children, location }) => {
  const style = {
    // global background color
    background: '#F5F7FA',
  };

  return (
    <div css={style}>
      <RipIe />
      <Helmet>
        <html lang="ja" />
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&amp;subset=japanese&amp;display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="noindex"></meta>
        <meta
          name="google-site-verification"
          content="LrV12wFqJ2dGgGOeLkC-nxYWoDkhoqG_636LifMXTDo"
        />
      </Helmet>
      <Header location={location} />

      {children}
    </div>
  );
};

export default TemplateWrapper;

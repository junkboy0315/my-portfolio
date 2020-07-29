import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faCaretSquareRight,
  faExternalLinkAlt,
  faStar,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Helmet from 'react-helmet';
import 'string.prototype.startswith';
import Header from './Header';
import RipIe from './RipIe';

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
        <script
          data-ad-client="ca-pub-7134126650568891"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Helmet>
      <Header location={location} />

      {children}
    </div>
  );
};

export default TemplateWrapper;

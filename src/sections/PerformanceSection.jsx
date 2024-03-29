import Link from 'gatsby-link';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import IconExtLink from '../components/IconExtLink';
import SectionContainer from '../components/SectionContainer';
import SectionHeader from '../components/SectionHeader';
import WhiteBox from '../components/WhiteBox';
import jissekiCompare from '../images/jisseki-compare.png';
import jissekiGoodmenu from '../images/jisseki-goodmenu.png';
import jissekiPict from '../images/jisseki-pict.png';
import { rhythm } from '../utils/typography';

const PerformanceSection = () => {
  const performances = [
    {
      name: 'GoodMenu',
      description:
        '飲食店の紙メニューを電子化するSaaSです。個人で運営しています。銀座のイタリアンレストランでも採用されています✨',
      techStack: [
        { name: 'React', description: 'UI' },
        { name: 'Terraform', description: 'インフラ管理' },
        { name: 'Django', description: 'バックエンド' },
        { name: 'Golang', description: 'バックエンド' },
        { name: 'GCP Cloud Build', description: 'CI/CD' },
        { name: 'GCP Cloud Run', description: 'コンテナ管理' },
        { name: 'GCP Cloud SQL', description: 'データベース' },
      ],
      webpageURL: 'https://goodmenu.io',
      imgPath: jissekiGoodmenu,
    },
    {
      name: 'react-compare-image',
      description:
        'スライダを使って画像を比較するために作った、Reactコンポーネントです。Uber社のWebサイトでも利用されています',
      techStack: [{ name: 'React', description: 'UI' }],
      webpageURL: 'https://www.npmjs.com/package/react-compare-image',
      githubURL: 'https://github.com/junkboy0315/react-compare-image',
      imgPath: jissekiCompare,
    },
    {
      name: 'Pairwise Pict Online',
      description:
        'ペアワイズ法に基づきテストケースを生成できるサービスです。なぜか共産圏からのアクセスが多め。何に使っているんだろう…',
      techStack: [
        { name: 'create-react-app', description: 'Front-end Framework' },
        { name: 'CircleCI', description: 'CI/CD' },
        { name: 'GCP Cloud Build', description: 'CI/CD' },
        { name: 'GCP Cloud Run', description: 'コンテナ管理' },
        { name: 'Node.js', description: 'APIサーバ' },
      ],
      webpageURL: 'https://pairwise.yuuniworks.com',
      githubURL: 'https://github.com/junkboy0315/pairwise-pict-online',
      imgPath: jissekiPict,
    },
  ];

  const styles = {
    grid: {
      display: 'grid',
      gridGap: rhythm(2),
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))',
      justifyContent: 'center',
      margin: 'auto',
      maxWidth: 1200,
    },
    whiteBox: {
      padding: rhythm(1),
    },
    itemImage: {
      border: '1px solid #aaa',
      objectFit: 'cover',
      height: '160px',
      width: '100%',
      filter: 'brightness(95%) grayscale(30%)',
    },
    itemTitle: {
      color: '#262626',
      display: 'block',
      fontWeight: 'bold',
      margin: '1rem 0',
      textDecoration: 'none',
    },
    description: {
      fontSize: '0.8rem',
      marginBottom: '0.8rem',
    },
    externalLink: {
      color: '#999',
      fontSize: '0.8rem',
      textDecoration: 'none',
      marginRight: '1rem',
      ':hover': {
        background: '#eee',
      },
    },
    techStackGrid: {
      borderTop: '1px dotted #999',
      display: 'grid',
      fontSize: '0.8rem',
      gridGap: '0.4rem',
      gridTemplateColumns: '1fr 1fr',
      marginTop: '0.8rem',
      paddingTop: '1rem',
      ' > span': {
        cursor: 'default',
      },
      ' > span::before': {
        content: '- ',
      },
    },
  };

  return (
    <SectionContainer id="performance" fadeOnAppear>
      <SectionHeader
        text="実績"
        subText="※ 受託案件は公開できないため、自社運営のサービスのみ掲載しております"
        colorNumber="1"
      />

      {/* グリッド始点 */}
      <div css={styles.grid}>
        {performances.map((performance) => (
          <WhiteBox key={performance.name} css={styles.whiteBox}>
            <a
              href={performance.webpageURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={performance.imgPath}
                css={styles.itemImage}
                alt={performance.name}
              />
            </a>

            <a
              href={performance.webpageURL}
              target="_blank"
              rel="noopener noreferrer"
              css={styles.itemTitle}
            >
              {performance.name}
              <IconExtLink />
            </a>

            <p css={styles.description}>{performance.description}</p>

            {performance.githubURL ? (
              <a
                href={performance.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                css={styles.externalLink}
              >
                ソースコード
              </a>
            ) : (
              <div style={{ color: 'transparent' }}>_</div>
            )}

            {performance.blogPath && (
              <Link
                to={performance.blogPath}
                target="_blank"
                css={styles.externalLink}
              >
                関連ブログ
              </Link>
            )}

            <ul css={styles.techStackGrid}>
              {performance.techStack.map((tech) => (
                <span
                  data-for={tech.name + tech.description}
                  data-tip
                  key={tech.name}
                >
                  {tech.name}
                  <ReactTooltip
                    id={tech.name + tech.description}
                    effect="solid"
                  >
                    {tech.description}
                  </ReactTooltip>
                </span>
              ))}
            </ul>
          </WhiteBox>
        ))}
      </div>
      {/* グリッド終点 */}
    </SectionContainer>
  );
};

export default PerformanceSection;

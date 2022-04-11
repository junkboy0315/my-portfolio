import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import AwsBadge from '../components/AwsBadge/AwsBadge';
import SectionContainer from '../components/SectionContainer';
import SectionHeader from '../components/SectionHeader';
import Skill from '../components/Skill';
import WhiteBox from '../components/WhiteBox';
import questionSvg from '../icons/question.svg';

const SkillSection = props => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 350px))',
      gridGap: '3rem',
      justifyContent: 'center',
      maxWidth: '1200px',
      margin: 'auto',
    },
    whiteBox: {
      padding: '2rem',
    },
    containerKihon: {
      position:
        'relative' /* 親要素をrelativeにしないと子(?マーク)がはみ出すため */,
    },
    helpButton: {
      color: '#999999',
      position: 'absolute',
      right: '0',
      top: '2px',
      outline: 'none',
      width: '15px',
      cursor: 'pointer',
      ' img': { width: '1.2rem' },
    },
    otherListItem: {
      marginBottom: '1rem',
    },
    sonotaTitle: {
      color: '#262626',
      fontWeight: 'bold',
    },
    sonotaContent: {
      marginTop: '.5rem',
    },
    caret: {
      marginRight: '.5rem',
      opacity: 0.8,
    },
    awsBadge: {
      display: 'inline-block',
      marginRight: '0.5rem',
      width: '80px',
    },
  };

  const skills = {
    フロントエンド: {
      'JavaScript / Typescript': 3,
      'React / React Native': 3,
      'React Query / Redux': 3,
      'Next.js / Remix': 3,
      Jest: 3,
      'PWA / Workbox': 2,
      GraphQL: 2,
      RxJS: 1,
    },
    バックエンド: {
      'AWS / GCP': 3,
      Docker: 3,
      'Node.js': 3,
      'Python / Django / DRF': 3,
      RDBMS: 3,
      Go: 2,
      Firebase: 2,
      Kubernetes: 2,
    },
  };

  return (
    <SectionContainer id="skill" colorNumber="2" skew fadeOnAppear>
      <SectionHeader text="スキル" colorNumber="2" />
      <div css={styles.grid}>
        <WhiteBox css={styles.whiteBox}>
          <div style={{ position: 'relative' }}>
            <h3>フロントエンド関連</h3>
            <div
              css={styles.helpButton}
              onClick={() => props.setCurrentModal('SKILL_HELP')}
              onKeyDown={e => {
                if (e.keyCode === 13) props.setCurrentModal('SKILL_HELP');
              }}
              role="button"
              tabIndex={0}
            >
              <img src={questionSvg} alt="hint button" />
            </div>
            {Object.keys(skills['フロントエンド']).map(skill => (
              <Skill
                skillName={skill}
                skillLevel={skills['フロントエンド'][skill]}
                key={skill}
              />
            ))}
          </div>
        </WhiteBox>

        <WhiteBox css={styles.whiteBox}>
          <div>
            <h3>バックエンド関連</h3>
            {Object.keys(skills['バックエンド']).map(skill => (
              <Skill
                skillName={skill}
                skillLevel={skills['バックエンド'][skill]}
                key={skill}
              />
            ))}
          </div>
        </WhiteBox>

        <WhiteBox css={styles.whiteBox}>
          <div>
            <h3>その他</h3>
            <ul>
              <li css={styles.otherListItem}>
                <div css={styles.sonotaTitle}>
                  <FontAwesomeIcon
                    icon="caret-square-right"
                    style={styles.caret}
                  />
                  資格
                </div>
                <div css={styles.sonotaContent}>
                  <div css={styles.awsBadge}>
                    <AwsBadge
                      cclaimBadgeId="0a5d0729-6520-46ab-9172-008e9911ac0a"
                      certType="saa"
                    />
                  </div>
                  <div css={styles.awsBadge}>
                    <AwsBadge
                      cclaimBadgeId="5df6c2c4-e3b3-4688-949e-29f6e853d613"
                      certType="clf"
                    />
                  </div>
                </div>
              </li>
              <li css={styles.otherListItem}>
                <div css={styles.sonotaTitle}>
                  <FontAwesomeIcon
                    icon="caret-square-right"
                    style={styles.caret}
                  />
                  言語
                </div>
                <div css={styles.sonotaContent}>日本語、英語</div>
              </li>
              <li css={styles.otherListItem}>
                <div css={styles.sonotaTitle}>
                  <FontAwesomeIcon
                    icon="caret-square-right"
                    style={styles.caret}
                  />
                  好きなツール
                </div>
                <div css={styles.sonotaContent}>VSCode, HHKB Pro2</div>
              </li>
            </ul>
          </div>
        </WhiteBox>
      </div>
    </SectionContainer>
  );
};

SkillSection.propTypes = {
  setCurrentModal: PropTypes.func.isRequired,
};

export default SkillSection;

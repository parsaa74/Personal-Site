import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Panel = styled.article`
  position: fixed;
  top: 72px;
  left: 50%;
  z-index: 220;
  width: min(680px, calc(100vw - 40px));
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: clamp(1.5rem, 4vw, 3rem);
  color: ${props => props.$isLight ? '#111' : '#f4f4f4'};
  background: ${props => props.$isLight ? '#fff' : '#050505'};
  border: 1px solid ${props => props.$isLight ? '#d8d8d8' : '#333'};
  transform: translateX(-50%);
  font-family: 'Moderat', sans-serif;

  @media (max-width: 768px) {
    top: 80px;
    width: calc(100vw - 28px);
    max-height: calc(100vh - 100px);
  }
`;

const Header = styled.header`
  padding-bottom: 2rem;

  small {
    display: block;
    margin-bottom: 0.65rem;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ReturnLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.75rem;
  padding: 0.5rem 0.75rem;
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  text-decoration: none;
  font-size: 0.72rem;

  &:hover,
  &:focus-visible {
    color: ${props => props.$isLight ? '#fff' : '#000'};
    background: ${props => props.$isLight ? '#111' : '#f4f4f4'};
    outline: none;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;

  a {
    color: inherit;
    font-size: 0.78rem;
    text-underline-offset: 3px;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid ${props => props.$isLight ? '#d8d8d8' : '#333'};

  h2 {
    margin: 0;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  > p {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.7;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid ${props => props.$isLight ? '#e6e6e6' : '#242424'};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }

  span {
    font-size: 0.7rem;
    line-height: 1.5;
    opacity: 0.6;
  }

  strong {
    display: block;
    font-size: 0.82rem;
    line-height: 1.5;
    font-weight: 500;
  }

  p {
    margin: 0.1rem 0 0;
    font-size: 0.75rem;
    line-height: 1.5;
    opacity: 0.7;
  }

  @media (max-width: 420px) {
    grid-template-columns: 72px 1fr;
  }
`;

const ExperienceRow = styled(Row)`
  grid-template-columns: 140px 1fr;

  a {
    color: inherit;
    text-underline-offset: 3px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
`;

const CVPanel = ({ isLight }) => (
  <Panel
    $isLight={isLight}
    onClick={event => event.stopPropagation()}
    aria-labelledby="cv-title"
  >
    <Header>
      <ReturnLink $isLight={isLight} to="/" aria-label="Return to the tree">
        ← Return
      </ReturnLink>
      <small id="cv-title">Curriculum vitae</small>
      <p>Designer · Developer<br />Based in Bremen</p>
      <Links aria-label="CV contact links">
        <a href="mailto:parsaazari28@proton.me">Email</a>
        <a
          href="https://www.linkedin.com/in/parsaazari/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Links>
    </Header>

    <Section $isLight={isLight}>
      <h2>Profile</h2>
      <p>
        A multidisciplinary practice spanning interaction design, creative coding,
        motion graphics, film, and performance. The work connects early cinema,
        media studies, and contemporary digital experiences.
      </p>
    </Section>

    <Section $isLight={isLight}>
      <h2>Work experience</h2>
      <div>
        <ExperienceRow $isLight={isLight}>
          <span>January 2024 — January 2025</span>
          <div>
            <strong>
              <a
                href="https://shadow-chasers.net/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sayeh Research Institute
              </a>
            </strong>
            <p>Graphic Designer and Front-End Engineer</p>
          </div>
        </ExperienceRow>
        <ExperienceRow $isLight={isLight}>
          <span>September 2022 — June 2023</span>
          <div>
            <strong>
              <a href="https://gaameno.com" target="_blank" rel="noopener noreferrer">
                Gaameno
              </a>
            </strong>
            <p>Graphic Designer</p>
          </div>
        </ExperienceRow>
        <ExperienceRow $isLight={isLight}>
          <span>September 2021 — June 2022</span>
          <div>
            <strong>
              <a href="https://novinketab.com" target="_blank" rel="noopener noreferrer">
                Novin Ketab Gooya
              </a>
            </strong>
            <p>Motion Designer</p>
          </div>
        </ExperienceRow>
      </div>
    </Section>

    <Section $isLight={isLight}>
      <h2>Education</h2>
      <div>
        <Row $isLight={isLight}>
          <span>Master</span>
          <div>
            <strong>Digital Media</strong>
            <p>Hochschule für Künste Bremen</p>
          </div>
        </Row>
        <Row $isLight={isLight}>
          <span>MA</span>
          <div>
            <strong>Art Research</strong>
            <p>Iran University of Art</p>
          </div>
        </Row>
        <Row $isLight={isLight}>
          <span>BA</span>
          <div>
            <strong>Cinema</strong>
            <p>Soore University</p>
          </div>
        </Row>
      </div>
    </Section>

    <Section $isLight={isLight}>
      <h2>Practice</h2>
      <div>
        <Row $isLight={isLight}>
          <span>Digital</span>
          <div>
            <strong>Interaction design and creative development</strong>
            <p>Web interfaces, 3D environments, generative systems, and creative code.</p>
          </div>
        </Row>
        <Row $isLight={isLight}>
          <span>Image</span>
          <div>
            <strong>Film and motion graphics</strong>
            <p>Cinema practice, cinematography, visual research, and motion-led design.</p>
          </div>
        </Row>
        <Row $isLight={isLight}>
          <span>Live</span>
          <div>
            <strong>Performance</strong>
            <p>Solo and collaborative work exploring identity, perception, and presence.</p>
          </div>
        </Row>
      </div>
    </Section>

    <Section $isLight={isLight}>
      <h2>Collectives</h2>
      <div>
        <Row $isLight={isLight}>
          <span>Research</span>
          <div>
            <strong>New Media Group</strong>
            <p>Tehran Museum of Contemporary Art</p>
          </div>
        </Row>
        <Row $isLight={isLight}>
          <span>Performance</span>
          <div>
            <strong>Beta</strong>
            <p>Performance art group</p>
          </div>
        </Row>
      </div>
    </Section>

    <Section $isLight={isLight}>
      <h2>Fields</h2>
      <p>Interaction design, creative coding, film, motion graphics, performance, and art research.</p>
    </Section>
  </Panel>
);

export default CVPanel;

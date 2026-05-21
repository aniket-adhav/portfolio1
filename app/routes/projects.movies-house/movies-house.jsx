import moviesHeroImg from '~/assets/movieshouse-screenshot.png';
import moviesListImg from '~/assets/movieshouse-screenshot2.png';
import { Footer } from '~/components/footer';
import { Button } from '~/components/button';
import { Image } from '~/components/image';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Fragment } from 'react';
import { Link } from '@remix-run/react';
import styles from './movies-house.module.css';

const title = 'Movies House — Android Movie Discovery App';
const description =
  'A feature-rich Android movie discovery app built with Jetpack Compose and MVVM architecture, integrating the TMDB API for real-time movie data, offline-first caching with Room DB, and detailed UI screens with cast info and recommendations.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Project' });
};

export function MoviesHouse() {
  return (
    <Fragment>
      <ProjectContainer className={styles.moviesHouse}>

        <div className={styles.backRow}>
          <Link to="/#project-2" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to projects
          </Link>
        </div>

        {/* ── Phone showcase FIRST — title below ── */}
        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent data-width="xl">
            <div className={styles.phoneShowcase}>
              <div className={`${styles.phoneFrame} ${styles.phoneFrameMain}`}>
                <Image
                  src={moviesHeroImg}
                  width={390}
                  height={844}
                  alt="Movies House app home screen showing featured movies, genre filters, and now playing section"
                  className={styles.phoneImage}
                />
              </div>
              <div className={styles.phoneFrame}>
                <Image
                  src={moviesListImg}
                  width={390}
                  height={844}
                  alt="Movies House app genre browse screen showing action movies with ratings"
                  className={styles.phoneImage}
                />
              </div>
            </div>

            {/* Title sits clearly below both phones */}
            <div className={styles.heroMeta}>
              <div className={styles.tag}>Android · Jetpack Compose · MVVM</div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.headerButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/Movies-House-App"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </Button>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Tech stack */}
        <ProjectSection className={styles.techSection}>
          <ProjectSectionContent>
            <ul className={styles.techList}>
              <li className={styles.techLabel}>Tech Stack</li>
              {[
                'Kotlin',
                'Jetpack Compose',
                'MVVM Architecture',
                'Retrofit',
                'Paging 3',
                'Room DB',
                'Hilt (DI)',
                'TMDB API',
                'Navigation Compose',
              ].map(tech => (
                <li key={tech} className={styles.techItem}>{tech}</li>
              ))}
            </ul>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.overviewColumns}>
            <div className={styles.overviewText}>
              <ProjectSectionHeading>The Idea</ProjectSectionHeading>
              <ProjectSectionText>
                Movies House was built to explore modern Android development patterns — specifically
                Jetpack Compose for declarative UI and the MVVM architecture for clean separation
                of concerns. The goal was to build a fully-functional, production-quality movie
                discovery experience, not just a tutorial sample.
              </ProjectSectionText>
              <ProjectSectionText>
                The app integrates the TMDB API via Retrofit to fetch real-time data: trending
                movies, genre listings, detailed cast information, and personalised recommendations.
                Paging 3 handles infinite scroll efficiently so large datasets load seamlessly
                without overwhelming memory.
              </ProjectSectionText>
            </div>
            <div className={styles.overviewText}>
              <ProjectSectionHeading>Offline First</ProjectSectionHeading>
              <ProjectSectionText>
                One of the core architectural decisions was adding offline support with Room DB.
                Browsed movie data is cached locally so the app remains functional without a
                network connection — a key real-world quality bar that many sample projects skip.
              </ProjectSectionText>
              <ProjectSectionText>
                Hilt handles dependency injection throughout, keeping the ViewModel, Repository,
                and data source layers cleanly decoupled and fully testable.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.featureGrid}>
              {[
                {
                  icon: '🎬',
                  title: 'TMDB Integration',
                  desc: 'Real-time movie data including trending, popular, now playing, and upcoming — all fetched via Retrofit with clean API layer abstraction.',
                },
                {
                  icon: '📱',
                  title: 'Jetpack Compose UI',
                  desc: 'Fully declarative UI built with Compose — smooth animations, responsive layouts, and custom components across all screen sizes.',
                },
                {
                  icon: '♾️',
                  title: 'Infinite Pagination',
                  desc: 'Paging 3 library powers smooth infinite scroll on genre and search result screens, loading data on demand without jank.',
                },
                {
                  icon: '💾',
                  title: 'Offline with Room',
                  desc: 'Room DB caches browsed movie data locally. The app continues to work fully offline for previously viewed content.',
                },
                {
                  icon: '🎭',
                  title: 'Cast & Details',
                  desc: 'Detailed movie screens show full cast, crew, ratings, overview, and similar movie recommendations powered by TMDB.',
                },
                {
                  icon: '🔍',
                  title: 'Genre Filtering',
                  desc: 'Browse movies by genre with a clean chip-based filter UI. Each genre page has its own paginated movie grid with poster and rating.',
                },
              ].map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.ctaSection}>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Explore the Source</ProjectSectionHeading>
              <ProjectSectionText>
                The full source code is available on GitHub — covering the complete Compose UI,
                TMDB API integration, Room caching setup, Hilt DI wiring, and Navigation Compose
                routing.
              </ProjectSectionText>
              <div className={styles.ctaButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/Movies-House-App"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Button>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

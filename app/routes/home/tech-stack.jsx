import styles from './tech-stack.module.css';

// 7-row pyramid: 12 → 10 → 8 → 6 → 4 → 2 → 1 = 43 skills
const techRows = [
  // Row 1 — Core Languages + Web (12)
  [
    { name: 'C++',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',      url: 'https://isocpp.org' },
    { name: 'Java',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',                url: 'https://java.com' },
    { name: 'Kotlin',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',            url: 'https://kotlinlang.org' },
    { name: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',            url: 'https://python.org' },
    { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',   url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'HTML',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',             url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',               url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',             url: 'https://react.dev' },
    { name: 'Next.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',           url: 'https://nextjs.org' },
    { name: 'Bootstrap',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',     url: 'https://getbootstrap.com' },
    { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', url: 'https://developer.android.com/studio' },
    { name: 'IntelliJ',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',       url: 'https://jetbrains.com/idea/' },
  ],
  // Row 2 — Frameworks + Android Ecosystem (10)
  [
    { name: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',           url: 'https://nodejs.org' },
    { name: 'Express',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',         url: 'https://expressjs.com' },
    { name: 'Spring Boot',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',           url: 'https://spring.io/projects/spring-boot' },
    { name: 'FastAPI',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',         url: 'https://fastapi.tiangolo.com' },
    { name: 'Tailwind',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', url: 'https://tailwindcss.com' },
    { name: 'Android',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',         url: 'https://developer.android.com' },
    { name: 'Jetpack',      icon: 'https://cdn.simpleicons.org/jetpackcompose/4285F4',                                        url: 'https://developer.android.com/jetpack/compose' },
    { name: 'Hibernate',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg',     url: 'https://hibernate.org' },
    { name: 'Material UI',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',   url: 'https://material.io' },
    { name: 'Room DB',      icon: 'https://cdn.simpleicons.org/android/3DDC84',                                               url: 'https://developer.android.com/training/data-storage/room' },
  ],
  // Row 3 — Libraries + Databases (8)
  [
    { name: 'Retrofit',   icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%2348B2A0'/%3E%3Cpath d='M7 6h6a3 3 0 0 1 0 6H7V6z' fill='white'/%3E%3Cpath d='M7 12h4l3.5 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E", url: 'https://square.github.io/retrofit/' },
    { name: 'Ktor',       icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ktor.svg',                            url: 'https://ktor.io' },
    { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',             url: 'https://mongodb.com' },
    { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',                 url: 'https://mysql.com' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',       url: 'https://postgresql.org' },
    { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',           url: 'https://firebase.google.com' },
    { name: 'SQLite',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',               url: 'https://sqlite.org' },
    { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                    url: 'https://git-scm.com' },
  ],
  // Row 4 — Build, Deploy & Tools (6)
  [
    { name: 'GitHub',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',    url: 'https://github.com' },
    { name: 'Gradle',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg',    url: 'https://gradle.org' },
    { name: 'Vercel',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',    url: 'https://vercel.com' },
    { name: 'VS Code',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',    url: 'https://code.visualstudio.com' },
    { name: 'Linux',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',      url: 'https://kernel.org' },
    { name: 'npm',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', url: 'https://npmjs.com' },
  ],
  // Row 5 — Tools & Competitive (4)
  [
    { name: 'Postman',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',             url: 'https://postman.com' },
    { name: 'LeetCode',   icon: 'https://cdn.simpleicons.org/leetcode/FFA116',                                                  url: 'https://leetcode.com/u/aniket_adhav/' },
    { name: 'HackerRank', icon: 'https://cdn.simpleicons.org/hackerrank/2EC866',                                                url: 'https://hackerrank.com/aniketadhav' },
    { name: 'GH Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',  url: 'https://github.com/features/actions' },
  ],
  // Row 6 — Project Libraries (2)
  [
    { name: 'Leaflet',    icon: 'https://cdn.simpleicons.org/leaflet/199900',    url: 'https://leafletjs.com' },
    { name: 'Cloudinary', icon: 'https://cdn.simpleicons.org/cloudinary/3448C5', url: 'https://cloudinary.com' },
  ],
  // Row 7 — Animation (1)
  [
    { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/0055FF', url: 'https://framer.com/motion' },
  ],
];

export const TechStack = ({ id, sectionRef, visible }) => {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={styles.section}
      data-visible={visible}
    >
      <div className={styles.content}>
        <div className={styles.heading} data-visible={visible}>
          <div className={styles.label}>Skills &amp; Technologies</div>
          <h2 className={styles.title}>Tech Stack</h2>
        </div>

        <div className={styles.pyramid} data-visible={visible}>
          {techRows.map((row, rowIdx) => (
            <div className={styles.row} key={rowIdx}>
              {row.map((item, itemIdx) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.item}
                  style={{ '--delay': `${(rowIdx * 12 + itemIdx) * 35}ms` }}
                  title={item.name}
                  data-cursor="disable"
                >
                  {/* Inner wrapper clips the ring/shine effects */}
                  <span className={styles.itemInner}>
                    <span className={styles.ring} aria-hidden="true" />
                    <span className={styles.shine} aria-hidden="true" />
                    <span className={styles.pulse} aria-hidden="true" />
                  </span>

                  {/* Icon floats above the card on hover */}
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.icon}
                    loading="lazy"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.tooltip}>{item.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

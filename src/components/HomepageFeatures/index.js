import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Database Sync',
    emoji: '🔄',
    description: (
      <>
        Sinkronisasi data dari berbagai database: PostgreSQL, MySQL, SQL Server,
        dan Oracle. Support full sync, incremental sync, dan UPSERT otomatis.
      </>
    ),
  },
  {
    title: 'MinIO Mirror',
    emoji: '☁️',
    description: (
      <>
        Replikasi bucket MinIO antar environment secara real-time.
        Support recursive mirror, differential sync, dan delete propagation.
      </>
    ),
  },
  {
    title: 'File Sync (FTP/SFTP)',
    emoji: '📁',
    description: (
      <>
        Tarik data dari FTP dan SFTP server. Support format CSV, JSON,
        dan Excel untuk integrasi dengan legacy systems.
      </>
    ),
  },
  {
    title: 'NoSQL Support',
    emoji: '📦',
    description: (
      <>
        Sync data dari MongoDB dan Redis. Perfect untuk aplikasi modern
        yang menggunakan kombinasi SQL dan NoSQL databases.
      </>
    ),
  },
  {
    title: 'REST API Integration',
    emoji: '🌐',
    description: (
      <>
        Fetch data dari REST API external dengan support semua HTTP methods
        dan authentication (API Key, Bearer Token, dll).
      </>
    ),
  },
  {
    title: 'Terminal Console',
    emoji: '�️',
    description: (
      <>
        Remote command execution dari Master ke Agent. Admin-only dengan
        command logging untuk audit trail lengkap.
      </>
    ),
  },
];

function Feature({ emoji, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {emoji}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

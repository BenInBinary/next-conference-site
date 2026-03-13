'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="hero-section">
        <div className="container">
          <h1 className="hero-title">Dev Interview Prep Hub</h1>
          <p className="hero-subtitle">Master modern backend, frontend, and system design concepts.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/learning" style={{
              backgroundColor: '#fff',
              color: '#0052cc',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1.1rem'
            }}>
              Start Practicing Now
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a2e' }}>Ready to crush your technical interviews?</h2>
          <p style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: 1.6, marginBottom: '2rem' }}>
            Our comprehensive library of technical questions covers everything from Node.js Event Loops and MongoDB Aggregation Pipelines to AWS Serverless Architecture and Web3 Smart Contracts. 
            Whether you are a junior developer or aiming for a senior role, we have the targeted questions you need.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left', marginTop: '3rem' }}>
            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0052cc' }}>Real-World Scenarios</h3>
              <p style={{ color: '#4a5568' }}>Questions modeled after actual interview patterns from top tech companies.</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#0052cc' }}>Deep Dive Answers</h3>
              <p style={{ color: '#4a5568' }}>Detailed explanations with code snippets so you understand the 'why' behind the 'how'.</p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#f8fafc', padding: '2rem', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <p style={{ color: '#64748b' }}>&copy; 2026 Dev Interview Prep Hub. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}

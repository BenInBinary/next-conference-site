'use client';

import { useState, useEffect } from 'react';
import { scheduleData, speakers as speakersData, Talk } from '../data/schedule';

export default function Home() {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentDate, setCurrentDate] = useState('');

  // Hydrate data and date on mount
  useEffect(() => {
    setTalks(scheduleData);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', dateOptions));
  }, []);

  // Filter Logic
  const filteredTalks = talks.filter(talk => {
    const isBreak = talk.category.toLowerCase() === 'break';

    // Category match check
    const categoryMatch = activeFilter === 'all' || talk.category === activeFilter;
    if (!categoryMatch) return false;

    // Search text match check (skip breaks if typing)
    if (isBreak && searchTerm !== '') return false;
    if (isBreak && searchTerm === '') return true;

    const term = searchTerm.toLowerCase();
    const titleMatch = talk.title.toLowerCase().includes(term);
    const categoryTextMatch = talk.category.toLowerCase().includes(term);

    let speakerMatch = false;
    if (talk.speakers) {
      speakerMatch = talk.speakers.some(speaker => {
        const fullName = `${speaker.firstName} ${speaker.lastName}`.toLowerCase();
        return fullName.includes(term);
      });
    }

    return titleMatch || categoryTextMatch || speakerMatch;
  });

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'Architecture', label: 'Architecture' },
    { id: 'Serverless', label: 'Serverless' },
    { id: 'Data & Analytics', label: 'Data & Analytics' },
    { id: 'AI / ML', label: 'AI / ML' },
    { id: 'Security', label: 'Security' },
    { id: 'FinOps', label: 'FinOps' }
  ];

  return (
    <>
      <header className="hero-section">
        <div className="container">
          <h1 className="hero-title">Google Cloud Tech Conference</h1>
          <p className="hero-subtitle">Building the Future, Together.</p>
          <div className="event-details">
            <div className="detail-item">
              <span className="icon">📅</span>
              <span id="current-date">{currentDate || 'Loading date...'}</span>
            </div>
            <div className="detail-item">
              <span className="icon">📍</span>
              <span>Googleplex, Mountain View, CA</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title, speaker, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        <section className="schedule-section">
          <h2 className="section-title">Event Schedule</h2>
          <div className="schedule-list">
            {filteredTalks.length === 0 ? (
              <div className="no-results">No talks found matching your criteria.</div>
            ) : (
              filteredTalks.map(talk => {
                const isBreak = talk.category.toLowerCase() === 'break';
                const cardClass = isBreak ? 'talk-card break-card' : 'talk-card';

                return (
                  <div key={talk.id} className={cardClass}>
                    <div className="talk-time-container">
                      {talk.time}
                    </div>
                    <div className="talk-content">
                      <div className="talk-header">
                        <h3 className="talk-title">{talk.title}</h3>
                        <span className="talk-category">{talk.category}</span>
                      </div>
                      <p className="talk-description">{talk.description}</p>

                      {talk.speakers && talk.speakers.length > 0 && (
                        <div className="talk-speakers">
                          {talk.speakers.map(speaker => (
                            <div key={speaker.id} className="speaker-item">
                              <div className="speaker-avatar">
                                {speaker.firstName.charAt(0)}{speaker.lastName.charAt(0)}
                              </div>
                              <span>
                                {speaker.firstName} {speaker.lastName}
                                <a href={speaker.linkedIn} target="_blank" rel="noopener noreferrer" className="speaker-linkedin" title="LinkedIn Profile">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                  </svg>
                                </a>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 Google Cloud Tech Conference. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}

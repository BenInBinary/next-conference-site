'use client';

import { useState } from 'react';
import { interviewQuestions } from '../../data/questions';

export default function LearningPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredQuestions = interviewQuestions.filter((q) => {
        const term = searchTerm.toLowerCase();
        const searchMatch =
            q.question.toLowerCase().includes(term) ||
            q.answer.toLowerCase().includes(term) ||
            q.category.toLowerCase().includes(term);

        const categoryMatch = activeFilter === 'All' || q.category === activeFilter;

        return searchMatch && categoryMatch;
    });

    // Derive unique categories dynamically from the data
    const categories = ['All', ...Array.from(new Set(interviewQuestions.map((q) => q.category)))];

    return (
        <>
            <header className="hero-section learning-hero">
                <div className="container">
                    <h1 className="hero-title">Backend Learning Hub</h1>
                    <p className="hero-subtitle">
                        Master the MERN Stack, Advanced Encryption, and Web3 Integration.
                    </p>
                </div>
            </header>

            <main className="container">
                <section className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search concepts, questions, or keywords (e.g., AES-256, React, Serverless)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="questions-section">
                    <h2 className="section-title">Interview Questions & Concepts</h2>
                    <div className="questions-list">
                        {filteredQuestions.length === 0 ? (
                            <div className="no-results">No questions matching "{searchTerm}" found.</div>
                        ) : (
                            filteredQuestions.map((q) => (
                                <div key={q.id} className={`question-card ${expandedId === q.id ? 'expanded' : ''}`}>
                                    <button
                                        className="question-header"
                                        onClick={() => toggleAccordion(q.id)}
                                    >
                                        <div className="question-header-content">
                                            <span className="question-category">{q.category}</span>
                                            <h3 className="question-text">{q.question}</h3>
                                        </div>
                                        <div className="accordion-icon">
                                            {expandedId === q.id ? '−' : '+'}
                                        </div>
                                    </button>

                                    {expandedId === q.id && (
                                        <div className="question-body">
                                            <p className="question-answer">{q.answer}</p>
                                            {q.snippet && (
                                                <div className="code-snippet-box">
                                                    <pre>
                                                        <code>{q.snippet}</code>
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
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

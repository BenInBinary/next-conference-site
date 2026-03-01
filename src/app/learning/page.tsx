'use client';

import { useState } from 'react';
import { interviewQuestions } from '../../data/questions';

export default function LearningPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'flashcards' | 'docs'>('flashcards');

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

    const categories = ['All', ...Array.from(new Set(interviewQuestions.map((q) => q.category)))];
    const docCategories = categories.filter(c => c !== 'All');
    const [docCategory, setDocCategory] = useState(docCategories[0] || 'System Design');

    return (
        <>
            <header className="hero-section learning-hero">
                <div className="container">
                    <h1 className="hero-title">Backend Learning Hub</h1>
                    <p className="hero-subtitle">
                        Master the MERN Stack, Advanced Encryption, and Web3 Integration.
                    </p>
                    <div className="view-toggle-container">
                        <div className="view-toggle-bg">
                            <button
                                className={`toggle-btn ${viewMode === 'flashcards' ? 'active-toggle' : ''}`}
                                onClick={() => setViewMode('flashcards')}
                            >
                                <span className="icon">🗂️</span> Flashcards
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'docs' ? 'active-toggle' : ''}`}
                                onClick={() => setViewMode('docs')}
                            >
                                <span className="icon">📖</span> Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {viewMode === 'flashcards' ? (
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
            ) : (
                <main className="container docs-layout">
                    <aside className="docs-sidebar">
                        <h3 className="sidebar-title">Topics</h3>
                        <ul className="sidebar-list">
                            {docCategories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        className={`sidebar-link ${docCategory === cat ? 'active' : ''}`}
                                        onClick={() => {
                                            setDocCategory(cat);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <section className="docs-content">
                        <div className="docs-header">
                            <span className="docs-breadcrumb">Documentation / {docCategory}</span>
                            <h2 className="docs-category-title">{docCategory}</h2>
                        </div>
                        <div className="docs-articles">
                            {interviewQuestions
                                .filter((q) => q.category === docCategory)
                                .map((q) => (
                                    <article key={q.id} className="doc-article">
                                        <h3 className="doc-question-title">{q.question}</h3>
                                        <div className="doc-answer-body">
                                            <p>{q.answer}</p>
                                        </div>
                                        {q.snippet && (
                                            <div className="interview-tip-container">
                                                <div className="interview-tip-header">
                                                    <span className="tip-icon">💡</span>
                                                    <span>Interview Notes & Snippets</span>
                                                </div>
                                                <div className="code-snippet-box doc-snippet">
                                                    <pre>
                                                        <code>{q.snippet}</code>
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                ))}
                        </div>
                    </section>
                </main>
            )}

            <footer>
                <div className="container">
                    <p>&copy; 2026 Google Cloud Tech Conference. Built with Next.js.</p>
                </div>
            </footer>
        </>
    );
}

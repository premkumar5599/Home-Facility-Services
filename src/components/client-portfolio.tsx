'use client';
import { useState } from 'react';
import Image from 'next/image';
import { clients } from '@/lib/data';

const categories = ['All clients', ...Array.from(new Set(clients.map(c => c.category)))];

export function ClientPortfolio() {
  const [category, setCategory] = useState('All clients');
  const visible = clients.filter(c => category === 'All clients' || c.category === category);

  return (
    <>
      <div className="filters fade-up" role="group" aria-label="Filter clients by industry">
        {categories.map(c => (
          <button
            type="button"
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="result-count fade-up" role="status">
        Showing {visible.length} {category === 'All clients' ? 'clients' : category.toLowerCase() + ' clients'}
      </p>
      <div className="portfolio-grid">
        {visible.map((c, i) => (
          <article
            className="portfolio-card fade-up in-view"
            key={c.name}
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            <div>
              <Image
                src={`/assets/${c.image}`}
                alt={c.name}
                width={160}
                height={100}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <p>{c.category}</p>
            <h3>{c.name}</h3>
          </article>
        ))}
      </div>
    </>
  );
}

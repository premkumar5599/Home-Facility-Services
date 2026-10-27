import { Eyebrow } from './ui';
export type Question = { question: string; answer: string };
export function FAQ({ title = 'Questions before you get started', items }: { title?: string; items: readonly Question[] }) {
  return <section className="section"><div className="container faq-layout"><div><Eyebrow>USEFUL ANSWERS</Eyebrow><h2>{title}</h2><p>Clear information to help you plan your next step.</p></div><div className="faq-list">{items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>;
}

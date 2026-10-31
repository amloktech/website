'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Search, X } from 'lucide-react';
import { blogDate, blogPosts, blogTopics } from '@/content/blog-posts';
import { BlogAuthor } from './blog-author';
import styles from './blog.module.css';

export function BlogSignup() {
  const [email, setEmail] = useState('');
  const [draft, setDraft] = useState('');
  return <div className={styles.signup}>
    <form aria-label="Sign up for AMLOK journal updates" onSubmit={event => {
      event.preventDefault();
      setDraft(`mailto:support@amlok.tech?subject=${encodeURIComponent('AMLOK journal — signup request')}&body=${encodeURIComponent(`Please add me to AMLOK journal updates.\n\nEmail: ${email.trim()}`)}`);
    }}>
      <input type="email" name="email" autoComplete="email" aria-label="Your email address" aria-describedby="signup-note" placeholder="Your email address" required maxLength={254} value={email} onChange={event => { setEmail(event.target.value); setDraft(''); }}/>
      <button type="submit">Sign up <ArrowUpRight size={16} aria-hidden="true"/></button>
    </form>
    <p id="signup-note">Request updates by email. <a href="/privacy">Privacy policy</a>.</p>
    {draft && <div className={styles.signupResponse} role="status"><p>Your signup request is ready. Send the email to request updates from our team.</p><a href={draft}>Open email request <ArrowUpRight size={15} aria-hidden="true"/></a></div>}
  </div>;
}

const pageSize = 6;
const normalize = (text: string) => text.normalize('NFKD').replace(/\p{Diacritic}/gu,'').toLowerCase();
const validTopic = (value: string | null) => blogTopics.some(topic => topic.value === value) ? value! : 'all';
const validPage = (value: string | null) => /^\d+$/.test(value || '') ? Math.max(1,Math.min(Number(value),Math.ceil(blogPosts.length/pageSize))) : 1;

export function BlogListing() {
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setTopic(validTopic(params.get('topic'))); setQuery(params.get('q') || ''); setPage(validPage(params.get('page')));
    };
    restore(); window.addEventListener('popstate',restore);
    return () => window.removeEventListener('popstate',restore);
  },[]);

  function update(nextTopic: string, nextQuery: string, nextPage = 1, addHistory = false) {
    setTopic(nextTopic); setQuery(nextQuery); setPage(nextPage);
    const url = new URL(window.location.href);
    for (const [key,value] of [['topic',nextTopic==='all'?'':nextTopic],['q',nextQuery.trim()],['page',nextPage===1?'':String(nextPage)]]) {
      if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
    }
    url.hash='all-posts';
    if (url.href !== window.location.href) {
      if (addHistory) window.history.pushState(null,'',url); else window.history.replaceState(null,'',url);
    }
  }

  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const matches = blogPosts.filter(post => (topic==='all'||topic===post.topicId) && terms.every(term=>normalize(`${post.title} ${post.description} ${post.topic}`).includes(term)));
  const totalPages = Math.max(1,Math.ceil(matches.length/pageSize));
  const currentPage = Math.min(page,totalPages);
  const visible = matches.slice((currentPage-1)*pageSize,currentPage*pageSize);
  const filtered = topic!=='all'||query.trim().length>0;
  function paginate(nextPage: number) {
    update(topic,query,nextPage,true);
    document.getElementById('all-posts')?.scrollIntoView({behavior:'instant',block:'start'});
    document.getElementById('blog-listing-title')?.focus({preventScroll:true});
  }

  return <section className={styles.listing} id="all-posts" aria-labelledby="blog-listing-title"><div className="cp-inner">
    <div className={styles.toolbar}>
      <h2 id="blog-listing-title" tabIndex={-1}>All posts.</h2>
      <div className={styles.filters}>
        <div className={styles.topicSelect}><select aria-label="Filter by topic" aria-controls="blog-results" value={topic} onChange={event=>update(event.target.value,query,1,true)}><option value="all">All Topics</option>{blogTopics.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}</select><ChevronDown size={17} aria-hidden="true"/></div>
        <div className={styles.search} role="search" aria-label="Blog search"><Search size={18} aria-hidden="true"/><input type="search" aria-label="Search posts" aria-controls="blog-results" placeholder="Search posts…" value={query} onChange={event=>update(topic,event.target.value)}/>{query&&<button type="button" aria-label="Clear search" onClick={()=>update(topic,'')}><X size={16} aria-hidden="true"/></button>}</div>
      </div>
    </div>
    <div className={styles.resultsMeta}><p role="status" aria-live="polite" aria-atomic="true">{matches.length} {matches.length===1?'post':'posts'}{query.trim()?` matching “${query.trim()}”`:''}{matches.length>pageSize?` · Page ${currentPage} of ${totalPages}`:''}</p>{filtered&&<button type="button" onClick={()=>update('all','',1,true)}>Clear filters <X size={13} aria-hidden="true"/></button>}</div>
    <div className={styles.grid} id="blog-results">{visible.map(post=><article className={styles.card} key={post.slug}>
      <a className={styles.cardLink} href={`/blog/${post.slug}`}><div className={styles.cardImage}><img src={post.image} alt="" width={1200} height={630} loading="lazy"/></div><div className={styles.tags}><span>{post.topic}</span><span aria-hidden="true">◆</span><time dateTime={post.date}>{blogDate(post.date)}</time></div><h3>{post.title}<ArrowUpRight size={21} aria-hidden="true"/></h3><p>{post.description}</p></a>
      <BlogAuthor post={post}/>
    </article>)}</div>
    {!matches.length&&<div className={styles.empty}><Search size={30} aria-hidden="true"/><h3>No posts found.</h3><p>Try a different search or explore another topic.</p><button className="cp-button" type="button" onClick={()=>update('all','',1,true)}>View all posts</button></div>}
    {totalPages>1&&<nav className={styles.pagination} aria-label="Blog pagination"><button type="button" aria-label="Previous page" disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}><ArrowLeft size={18} aria-hidden="true"/></button>{Array.from({length:totalPages},(_,i)=><button key={i} type="button" aria-label={`Page ${i+1}`} aria-current={currentPage===i+1?'page':undefined} onClick={()=>paginate(i+1)}>{i+1}</button>)}<button type="button" aria-label="Next page" disabled={currentPage===totalPages} onClick={()=>paginate(currentPage+1)}><ArrowRight size={18} aria-hidden="true"/></button></nav>}
  </div></section>;
}

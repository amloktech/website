import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { SiteHeader } from './site-header';
import { BlogListing, BlogSignup } from './blog-tools';
import { BlogAuthor } from './blog-author';
import { blogDate, blogPosts, type BlogPost } from '@/content/blog-posts';
import { siteOrigin } from '@/lib/site-config';
import type { SitePageContent } from '@/lib/site-content';
import styles from './blog.module.css';

function JournalGraphic() {
  return <div className={styles.heroGraphic} aria-hidden="true">
    <svg viewBox="0 0 600 320" fill="none">
      <defs><linearGradient id="journal-line"><stop stopColor="#2567ff"/><stop offset="1" stopColor="#052698"/></linearGradient></defs>
      <g stroke="#d8e2f5"><path d="M0 65H600M0 160H600M0 255H600"/><path d="M100 0V320M200 0V320M300 0V320M400 0V320M500 0V320" opacity=".45"/></g>
      <g stroke="url(#journal-line)" strokeWidth="2"><path d="M0 65H150Q180 65 180 95V130Q180 160 210 160H600"/><path d="M0 255H310Q340 255 340 225V95Q340 65 370 65H600"/><path d="M0 160H420Q450 160 450 190V225Q450 255 480 255H600"/></g>
      <g fill="#2567ff"><circle cx="100" cy="65" r="6"/><circle cx="510" cy="160" r="6"/><circle cx="240" cy="255" r="6"/></g>
      <circle cx="300" cy="160" r="46" fill="#e8efff"/><rect x="267" y="127" width="66" height="66" rx="20" fill="white" stroke="#c4d5ff"/>
      <path d="M281 174L295 146H305L319 174H309L300 156L294 166H302L306 174H281Z" fill="#052698"/>
      <g fill="#7da1ff"><rect x="392" y="57" width="16" height="16" rx="3" transform="rotate(45 400 65)"/><rect x="512" y="247" width="16" height="16" rx="3" transform="rotate(45 520 255)"/></g>
    </svg>
    <span>Different perspectives. Connected thinking.</span>
  </div>;
}

function BlogFeatured() {
  const post = blogPosts[0];
  return <section className={styles.featuredSection} aria-label="Featured blog post">
    <a className={styles.featured} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
      <div className={styles.featuredImage}><img src={post.image} alt="" width={1200} height={630} fetchPriority="high"/></div>
      <div className={styles.featuredCopy}>
        <div className={styles.tags}><span>{post.topic}</span><span aria-hidden="true">◆</span><time dateTime={post.date}>{blogDate(post.date)}</time></div>
        <h2>{post.title}</h2><p>{post.description}</p>
        <BlogAuthor post={post}/><span className={styles.readLink}>Read article <ArrowUpRight size={17} aria-hidden="true"/></span>
      </div>
    </a>
  </section>;
}

function MoreResources() {
  return <section className={styles.more}><div className="cp-inner"><div><span className="cp-eyebrow"><i/>KEEP EXPLORING</span><h2>A little more <span className="home-heading-gradient">perspective.</span></h2></div><div className={styles.moreLinks}><a href="/research">Research library <ArrowUpRight size={20}/></a><a href="/platform">The AMLOK platform <ArrowUpRight size={20}/></a><a href="/developers">Developer resources <ArrowUpRight size={20}/></a></div></div></section>;
}

export function BlogPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteOrigin },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteOrigin}/blog` },
  ] };
  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <section className={styles.hero} aria-labelledby="blog-title"><div className="cp-inner">
      <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13}/><span aria-current="page">Blog</span></nav>
      <div className={styles.heroGrid}><div>
        <span className="cp-eyebrow"><i/>THE AMLOK JOURNAL</span>
        <h1 id="blog-title">A clearer view.<br/><span className="home-heading-gradient">On risk.</span></h1>
        <p>Ideas, practical perspectives, and fresh thinking on credit, connected data, and the intelligence behind better-informed decisions.</p>
        <BlogSignup/>
      </div><JournalGraphic/></div>
      <BlogFeatured/>
    </div></section>
    <BlogListing/>
    <MoreResources/>
  </main>;
}

export function BlogArticle({ page, post }: { page: SitePageContent; post: BlogPost }) {
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
    description: post.description, datePublished: post.date, image: `${siteOrigin}${post.image}`,
    author: { '@type': 'Organization', name: post.author, url: siteOrigin },
    publisher: { '@type': 'Organization', name: 'AMLOK', url: siteOrigin },
    mainEntityOfPage: `${siteOrigin}/blog/${post.slug}` };
  return <main className={`home-page cp-page ${styles.page}`} id="top"><SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <article>
      <header className={styles.articleHero}><div className="cp-inner">
        <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13}/><a href="/blog">Blog</a><ChevronRight size={13}/><span aria-current="page">{post.topic}</span></nav>
        <div className={styles.articleIntro}><div className={styles.tags}><a href={`/blog?topic=${post.topicId}#all-posts`}>{post.topic}</a><span aria-hidden="true">◆</span><time dateTime={post.date}>{blogDate(post.date)}</time></div>
          <h1>{page.title}<br/><span className="home-heading-gradient">{page.accent}</span></h1><p>{post.description}</p><BlogAuthor post={post}/>
        </div>
        <img className={styles.articleImage} src={post.image} alt={`Abstract AMLOK illustration for ${post.topic.toLowerCase()}`} width={1200} height={630}/>
      </div></header>
      <div className={`cp-inner ${styles.articleBody}`}>
        <aside><span className="cp-eyebrow">IN THIS ARTICLE</span><nav aria-label="Article sections">{page.sections.map((section,index) => <a key={section.title} href={`#perspective-${index+1}`}>{section.title}</a>)}</nav></aside>
        <div>{page.sections.map((section,index) => <section key={section.title} id={`perspective-${index+1}`}><h2>{section.title}</h2><p>{section.body}</p></section>)}<a className="cp-text-link" href="/blog#all-posts">Back to all posts <ArrowUpRight size={18}/></a></div>
      </div>
    </article><MoreResources/>
  </main>;
}

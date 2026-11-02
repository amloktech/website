import type { BlogPost } from '@/content/blog-posts';
import styles from './blog.module.css';

export function BlogAuthor({ post }: { post: Pick<BlogPost, 'author' | 'readMinutes' | 'topic'> }) {
  return <div className={styles.author}>
    <span className={styles.authorMark}><img src="/brand/amlok-mark-blue.svg" width={24} height={24} alt=""/></span>
    <span>{post.author}</span><span className={styles.readTime}>{post.readMinutes} min read</span><span className={styles.topic}>{post.topic}</span>
  </div>;
}

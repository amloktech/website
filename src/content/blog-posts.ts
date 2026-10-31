import entries from './blog-posts.json';

export type BlogPost = typeof entries[number];
export const blogPosts: BlogPost[] = entries;
export const blogTopics = Array.from(new Map(entries.map(post => [post.topicId, post.topic])).entries())
  .map(([value, label]) => ({ value, label }));
export const blogDate = (date: string) => new Intl.DateTimeFormat('en', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T12:00:00Z`));

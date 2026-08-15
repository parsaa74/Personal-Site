import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

export function useSanityQuery(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Sanity fetch error:', err);
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, JSON.stringify(params)]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}

// Pre-built queries
export const queries = {
  blogPosts: `*[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    category,
    excerpt,
    content,
    poem,
    poemAttribution
  }`,

  projects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    liveUrl,
    githubUrl,
    "category": category->slug.current
  }`,

  categories: `*[_type == "category"] | order(name asc) {
    _id,
    name,
    "id": slug.current
  }`,

  page: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    body
  }`,
};

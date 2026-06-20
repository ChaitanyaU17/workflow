import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const BASE_URL = 'https://workflow-x274.onrender.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical, ogImage }) => {
  const fullTitle = `${title} | Workflow X`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const image = ogImage ?? DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setLink('canonical', canonicalUrl);
  }, [fullTitle, description, canonicalUrl, image]);

  return null;
};

export default SEOHead;

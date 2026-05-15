import express from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({ 
      hostname: 'https://jainscomputer.com' 
    });

    const urls = [
      // Static Pages
      { url: '/',                          changefreq: 'weekly',  priority: 1.0, lastmod: '2026-05-14' },
      { url: '/courses',                   changefreq: 'weekly',  priority: 0.9, lastmod: '2026-05-14' },
      { url: '/why-choose-us',             changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog',                      changefreq: 'weekly',  priority: 0.8, lastmod: '2026-05-14' },
      { url: '/contact',                   changefreq: 'monthly', priority: 0.7, lastmod: '2026-05-14' },
      { url: '/privacy-policy',            changefreq: 'yearly',  priority: 0.3, lastmod: '2026-05-14' },
      { url: '/terms-conditions',          changefreq: 'yearly',  priority: 0.3, lastmod: '2026-05-14' },

      // Course Detail Pages
      { url: '/courses/digital-marketing',       changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/tally-gst',               changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/cad-courses',             changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/video-editing',           changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/artificial-intelligence', changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/graphic-designing',       changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/website-design',          changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/data-analytics',          changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/programming',             changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/advanced-excel',          changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/government-courses',      changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },
      { url: '/courses/personality-development', changefreq: 'monthly', priority: 0.9, lastmod: '2026-05-14' },

      // Blog Pages
      { url: '/blog/digital-marketing-demand-jaipur',                changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/coding-classes-jaipur-beginners-guide',          changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/jains-vs-digital-marketing-institutes-jaipur',   changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/digital-marketing-guide',                        changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/choose-right-computer-classes-jaipur',           changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/graphic-design-vs-web-design-career',            changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/top-skills-digital-marketing-course-jaipur',     changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/career-scope-video-editing-courses-2026',        changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/best-tally-institute-jaipur-key-factors',        changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
      { url: '/blog/cad-training-jaipur-classroom-experience',       changefreq: 'monthly', priority: 0.8, lastmod: '2026-05-14' },
    ];

    urls.forEach(url => smStream.write(url));
    smStream.end();

    const sitemap = await streamToPromise(smStream);
    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap.toString());

  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).end();
  }
});

export default router;
export default function sitemap() {
  const baseUrl = 'https://nkth90d1y.vercel.app';
  
  // 基本ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/survey`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 16のMBTI性格タイプの結果ページ
  const mbtiTypes = [
    'intj', 'intp', 'entj', 'entp', // NT（分析家）
    'infj', 'infp', 'enfj', 'enfp', // NF（外交官）
    'istj', 'isfj', 'estj', 'esfj', // SJ（管理者）
    'istp', 'isfp', 'estp', 'esfp'  // SP（探検家）
  ];

  const resultPages = mbtiTypes.map(type => ({
    url: `${baseUrl}/result/${type}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 追加の関連ページ（今後の実装用）
  const additionalPages = [
    {
      url: `${baseUrl}/compatibility`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lifestyle`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...resultPages, ...additionalPages];
}
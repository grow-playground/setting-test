import { MetadataRoute } from 'next';

const PROD_URL = process.env.NEXT_PUBLIC_PROD_URL;

async function getQuizzes(): Promise<
  Database['public']['Tables']['quizzes']['Row'][]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes`);

  const { quizzes } = await res.json();

  return quizzes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const quizzes = await getQuizzes();

  const quizSitemaps = quizzes.map((quiz) => ({
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/quizzes/${quiz.id}`,
    lastModified: quiz.updated_at,
  }));

  return [
    {
      url: `${PROD_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...quizSitemaps,
  ];
}

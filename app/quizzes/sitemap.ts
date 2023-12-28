import { type MetadataRoute } from 'next';

async function getQuizzes(): Promise<
  Database['public']['Tables']['quizzes']['Row'][]
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes`);

  const { quizzes } = await res.json();

  return quizzes;
}

export async function generateSitemaps() {
  const quizzes = await getQuizzes();

  return quizzes.map((quiz) => ({
    id: quiz.id,
  }));
}
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const quizzes = await getQuizzes();

  return quizzes.map((quiz) => ({
    url: `${process.env.NEXT_PUBLIC_PROD_URL}/quizzes/${id}`,
    lastModified: quiz.updated_at,
  }));
}

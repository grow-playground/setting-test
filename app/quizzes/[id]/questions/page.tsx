export default async function Page({ params }: { params: { id: string } }) {
  const quizId = Number(params.id) ?? 0;

  return <section>{quizId}번 퀴즈에 대한 질문 페이지</section>;
}

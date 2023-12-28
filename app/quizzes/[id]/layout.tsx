import BackHeader from '@/components/common/headers/back-header';
import NavLink from '@/components/common/link/nav-link';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default function Layout({ children, params }: LayoutProps) {
  const quizId = Number(params.id) ?? 0;

  return (
    <>
      <BackHeader />

      <section className="p-4">
        <article className="mb-4 flex w-full">
          <NavLink className="grow" replace href={`/quizzes/${quizId}`}>
            퀴즈
          </NavLink>
          <NavLink
            className="grow"
            replace
            href={`/quizzes/${quizId}/questions`}
          >
            질문
          </NavLink>
          <NavLink className="grow" replace href={`/quizzes/${quizId}/answers`}>
            솔루션
          </NavLink>
        </article>
        {children}
      </section>
    </>
  );
}

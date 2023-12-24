'use client';

import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';

export default function Page() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">제목</h2>
      <h2 className="text-lg font-bold">힌트</h2>
      <MarkdownEditor>
        <div className="flex">
          <h2 className="text-lg font-bold">문제 내용</h2>
          <MarkdownEditor.Toggler>
            {({ previewMode, toggle }) => (
              <Button onClick={toggle}>
                {previewMode ? '편집하기' : '미리보기'}
              </Button>
            )}
          </MarkdownEditor.Toggler>
        </div>
        <MarkdownEditor.Content />
      </MarkdownEditor>
    </div>
  );
}

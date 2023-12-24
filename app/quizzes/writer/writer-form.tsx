'use client';
import Button from '@/components/common/buttons/button';
import MarkdownEditor from '@/components/common/markdown/markdown-editor';

export default function WriterForm() {
  return (
    <form>
      <h2 className="text-lg font-bold">제목</h2>
      <h2 className="text-lg font-bold">힌트</h2>
      <MarkdownEditor>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="grow text-lg font-bold">문제 내용</h2>
          <MarkdownEditor.PreviewToggler>
            {({ isPreview, toggle }) => (
              <Button size="small" onClick={toggle}>
                {isPreview ? '편집하기' : '미리보기'}
              </Button>
            )}
          </MarkdownEditor.PreviewToggler>
        </div>
        <MarkdownEditor.Content />
      </MarkdownEditor>
    </form>
  );
}

import { cn } from '@/libs/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownProps extends React.ComponentProps<typeof SyntaxHighlighter> {
  className?: string;
}

export default function MarkDown({
  children,
  className,
  style = dracula,
  ...props
}: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn('markdown', className)}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...rest }) {
          const language = className?.replace('language-', '');

          return language ? (
            <SyntaxHighlighter
              {...rest}
              customStyle={{ padding: '0', overflow: 'hidden' }}
              language={language}
              style={style}
              ref={null}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              {...rest}
              className={cn('bg-gray-300 p-1 rounded-md', className)}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
}

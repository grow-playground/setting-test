import { cn } from '@/libs/utils';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkDownProps
  extends Pick<
    React.ComponentPropsWithoutRef<typeof ReactMarkdown>,
    'className' | 'children'
  > {
  style: {
    [key: string]: React.CSSProperties;
  };
}

export default function MarkDown({
  className,
  style = dracula,
  children,
  ...props
}: MarkDownProps) {
  return (
    <ReactMarkdown
      className={cn('prose', className)}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={style}
              ref={null}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}

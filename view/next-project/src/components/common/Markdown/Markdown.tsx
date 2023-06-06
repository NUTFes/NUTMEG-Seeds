import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import s from './Markdown.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 任意のテーマをimport
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  children: string;
}

// コードブロックのレンダリング
const CodeBlock = {
  pre: (pre: any) => {
    // 中身がcodeでなければ普通に表示させる
    if (pre.children[0].type !== 'code') {
      return <pre>{pre.children}</pre>;
    }

    const code = pre.children[0];
    // 正規表現で"language-言語名:ファイル名"をマッチする
    const matchResult = code.props.className ? code.props.className.match(/language-(\w+)(:(.+))?/) : '';
    const language = matchResult?.[1] || '';
    const filename = matchResult?.[3] || undefined;

    return (
      <SyntaxHighlighter
        language={language}
        style={materialDark}
        // // ファイル名がある場合、表示用の余白を作る
        // customStyle={filename && { paddingTop: '2.5rem' }}
        showLineNumbers
        className={s.syntaxHighlighter}
        // // CSSの擬似要素を使ってファイル名を表示させるため
        // fileName={fileName}
      >
        {code.props.children[0]}
      </SyntaxHighlighter>
    );
  },
};

export default function Markdown(props: Props) {
  return (
    <div className={s.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={CodeBlock}>
        {props.children}
      </ReactMarkdown>
    </div>
  );
}

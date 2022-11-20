import "@toast-ui/editor/dist/toastui-editor.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import ReactMarkdown from "react-markdown";

const Markdown = ({ comment }) => {
  return (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={comment.content}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {comment.content}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Markdown;

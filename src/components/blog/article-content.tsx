import ReactMarkdown from "react-markdown";

interface ArticleContentProps {
  content: string;
}

function createId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose max-w-none border-2 border-blue-400/20 shadow-2xl rounded-2xl p-2">
      <ReactMarkdown
        components={{
          h2: ({ children }) => {
            const text = String(children);

            return <h2 id={createId(text)}>{children}</h2>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

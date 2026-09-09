"use client";
import SplitText from "../animations/text-split";
export default function SplitH2({ text }) {
  return (
    <div className="w-full text-center">
      <h2>
        <SplitText
          text={text}
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.5}
          rootMargin="-100px"
          textAlign="center"
          showCallback={false}
        />
      </h2>
    </div>
  );
}

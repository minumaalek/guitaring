export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getHeadings(content: string): Heading[] {
  const lines = content.split(/\r?\n/);

  return lines
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      console.log("MATCH:", match);

      if (!match) return null;

      const level = match[1].length as 2 | 3;
      const text = match[2].trim();

      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      return {
        id,
        text,
        level,
      };
    })
    .filter((heading): heading is Heading => heading !== null);
}

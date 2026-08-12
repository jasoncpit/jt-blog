const mathImport = 'import Math from "@components/Math.astro";\n';

/**
 * Converts normal Markdown maths to the local Astro component before MDX sees
 * it. This is important because MDX otherwise treats LaTex braces as JS.
 */
export default function latexMdx() {
  return {
    name: "latex-mdx",
    enforce: "pre",
    transform(source, id) {
      if (!id.includes("/src/content/") || !id.endsWith(".mdx")) return null;

      let usedMath = false;
      const transformed = source
        .split(/(```[\s\S]*?```)/g)
        .map((part) => {
          if (part.startsWith("```")) return part;
          return part
            .replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
              usedMath = true;
              return `<Math display formula={${JSON.stringify(formula.trim())}} />`;
            })
            .replace(/(?<!\\)\$([^$\n]+?)\$/g, (_, formula) => {
              usedMath = true;
              return `<Math formula={${JSON.stringify(formula.trim())}} />`;
            });
        })
        .join("");

      if (!usedMath) return null;

      const code = source.includes(mathImport.trim())
        ? transformed
        : transformed.replace(/^---[\s\S]*?---\n/, (frontmatter) => `${frontmatter}${mathImport}`);

      return {
        code,
        map: null,
      };
    },
  };
}

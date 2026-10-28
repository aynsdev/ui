import * as React from "react"

// A small tokenizer: enough for TSX, CSS, JSON and shell snippets in the docs.
const rules: [string, RegExp][] = [
  ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\/|(?<=^|\s)#[^\n]*/y],
  ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/y],
  ["tag", /(?<=<\/?)[A-Za-z][\w.]*/y],
  ["attr", /\b[a-zA-Z-]+(?==[{"])/y],
  ["keyword", /\b(?:import|from|export|default|function|return|const|let|as|type|if|else|true|false|null|undefined|new|async|await|@import|@theme|@layer|@apply|@custom-variant|@source|npx|pnpm|yarn|bunx|dlx)\b|@(?:import|theme|layer|apply|custom-variant|source)\b/y],
  ["plain", /[\s\S]/y],
]

const color: Record<string, string> = {
  comment: "text-(--code-comment) italic",
  string: "text-(--code-string)",
  tag: "text-(--code-tag)",
  attr: "text-(--code-attr)",
  keyword: "text-(--code-keyword)",
}

export function highlight(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let plain = ""
  let i = 0
  while (i < code.length) {
    for (const [kind, re] of rules) {
      re.lastIndex = i
      const m = re.exec(code)
      if (!m || !m[0]) continue
      if (kind === "plain") plain += m[0]
      else {
        if (plain) out.push(plain), (plain = "")
        out.push(
          <span key={i} className={color[kind]}>
            {m[0]}
          </span>
        )
      }
      i += m[0].length
      break
    }
  }
  if (plain) out.push(plain)
  return out
}

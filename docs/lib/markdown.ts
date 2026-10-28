import { components, NAMESPACE, REGISTRY_URL, REPO_URL, themeCss, type ComponentEntry } from "./registry"

const fence = (code: string, lang = "tsx") => "```" + lang + "\n" + code + "\n```"

export const addCommand = (names: string | string[]) =>
  `npx shadcn@latest add ${(Array.isArray(names) ? names : [names]).map((n) => `${NAMESPACE}/${n}`).join(" ")}`

export const componentsJsonSnippet = JSON.stringify({ registries: { [NAMESPACE]: REGISTRY_URL } }, null, 2)

const setupSteps = `1. The project must already use shadcn/ui (a \`components.json\` exists). If not, run \`npx shadcn@latest init\` first.
2. Add the registry to \`components.json\` (merge, do not replace other keys):

${fence(componentsJsonSnippet, "json")}`

export function componentMarkdown(c: ComponentEntry) {
  const parts = [
    `# ${c.title}`,
    c.description,
    `## Installation\n\n${fence(addCommand(c.id), "bash")}\n\nInstalls to \`${c.files.map((f) => f.target).join("`, `")}\`${
      c.dependencies.length ? ` and adds ${c.dependencies.map((d) => `\`${d}\``).join(", ")}` : ""
    }. The theme (\`${NAMESPACE}/theme\`) is installed with it.`,
    `## Usage\n\n${fence(c.usage)}`,
    ...c.examples.map((e) => `## Example: ${e.title}\n\n${fence(e.source)}`),
    `## Guidelines\n\n${c.guidelines.map((g) => `- ${g}`).join("\n")}`,
  ]
  if (c.api?.length) {
    parts.push(
      "## API\n\n" +
        c.api
          .map(
            (a) =>
              `### ${a.name}\n\n` +
              (a.props.length
                ? "| Prop | Type | Default | Description |\n| --- | --- | --- | --- |\n" +
                  a.props.map((p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.default ? `\`${p.default}\`` : "–"} | ${p.description} |`).join("\n")
                : "Accepts the props of the underlying element.")
          )
          .join("\n\n")
    )
  }
  if (c.primitive) parts.push(`Other props are passed to ${c.primitive.name}: ${c.primitive.href}`)
  return parts.join("\n\n") + "\n"
}

function agentPrompt(agent: "Claude" | "Codex", subject: string, names: string[], body: string) {
  return `You are working in a React + Tailwind v4 project that uses shadcn/ui. Add ${subject} from the ${NAMESPACE} design system (${REPO_URL}).

## Setup

${setupSteps}

3. Run:

${fence(addCommand(names), "bash")}

4. Import from \`@/components/ui/...\` and use the components as documented below. Do not restyle them with ad-hoc colours: use the theme tokens (\`bg-background\`, \`text-muted-foreground\`, \`border-border\`, \`text-success\`, …).
${agent === "Codex" ? "5. Run the project's typecheck and build after installing, and fix any import path differences (aliases come from components.json).\n" : "5. Verify the result renders in light and dark mode (the `.dark` class on <html>).\n"}
## Reference

${body}`
}

export const componentPrompt = (c: ComponentEntry, agent: "Claude" | "Codex") =>
  agentPrompt(agent, `the ${c.title} component`, [c.id], componentMarkdown(c))

/** Push every heading one level down, leaving code fences alone. */
function demote(md: string) {
  let inFence = false
  return md
    .split("\n")
    .map((line) => {
      if (line.startsWith("```")) inFence = !inFence
      return !inFence && /^#{1,5} /.test(line) ? "#" + line : line
    })
    .join("\n")
}

export function systemMarkdown() {
  return [
    `# ${NAMESPACE} design system`,
    "A refined, minimalist identity: pure neutral greys, a near-black dark mode, Inter at weight 500, filled surfaces with generous radii, pill-shaped actions, no decorative shadows. Distributed as a shadcn registry.",
    `## Install everything\n\n${setupSteps}\n\n3. Run:\n\n${fence(addCommand("all"), "bash")}`,
    `## Theme\n\n${fence(themeCss, "css")}`,
    ...components.map((c) => demote(componentMarkdown(c))),
  ].join("\n\n")
}

export const systemPrompt = (agent: "Claude" | "Codex") =>
  agentPrompt(agent, "the full design system (theme and every component)", ["all"], systemMarkdown())

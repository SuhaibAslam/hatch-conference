# Owl AI Design Skills

## What is Owl?

[Owl AI Design Skills](https://github.com/Owl-Listener/ai-design-skills) is an open-source collection of installable skills and commands for AI agents that help people design AI products. Its 44 skills cover areas such as prompt architecture, human and AI turn-taking, system behaviour and evaluation. Each skill is a folder containing a `SKILL.md` file with a name, description and instructions an agent can load.

You do not need Owl to use this repository. The workshop works with any capable AI tool, or without an AI tool during the paper activities.

## Use this repository first

Use the files in [skills/](../skills/) with any AI tool. Each one helps you make a different kind of decision in the workshop:

| When you need to | Use |
| --- | --- | --- |
| Set the inputs, limits and expected output | [Constraint specification](../skills/constraint-specification/SKILL.md) |
| Decide who leads and how control moves | [Mixed-initiative flow](../skills/mixed-initiative-flow/SKILL.md) |
| Make permission and override possible | [Consent and agency](../skills/consent-and-agency/SKILL.md) |
| Show sources, limits and uncertainty clearly | [Transparency patterns](../skills/transparency-patterns/SKILL.md) |
| Recover when a tool, input, handoff or output fails | [Failure recovery](../skills/failure-recovery/SKILL.md) |
| Compare a baseline and guided output | [Comparative evaluation](../skills/comparative-evaluation/SKILL.md) |

Open the one that matches your next decision. Use it with the relevant workshop artifact, then test the guidance with actual work.

## Choose how to work

1. **Use the workshop materials only.** Follow [workshop/00-start-here.md](../workshop/00-start-here.md), use the relevant [skills](../skills/), and test the result through [05-evaluate/00-start-here.md](../workshop/05-evaluate/00-start-here.md).
2. **Use any AI chat or coding tool.** Start with [tool-setup/](../tool-setup/), give it the relevant workshop artifact and skill, and keep the team’s evidence and decisions visible.
3. **Explore Owl upstream.** Install or browse Owl only if you want the wider collection and your agent supports its plugin or skill format. The upstream project documents its own installation and compatibility.

## Learn more about the sources

The six design skills above are concise working guides based on related ideas in Owl. They are designed to work with the workshop canvases rather than replace the full Owl collection. The separate skill-creation file helps teams improve their own guidance over time. Follow the links in each skill’s “Explore further” section to read the original concept.

## About skill creation

Use [create-and-improve-skills](../skills/create-and-improve-skills/SKILL.md) when you want to keep a skill after the workshop. It gives you a practical draft, test, review and revision loop. The fuller [Anthropic skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) is available when you want more advanced tooling.

# Design Skills for the Agentic Era

Use this repository to work on one real AI-supported workflow. Make the agreement clear, write useful guidance, test it against a baseline, and decide what to improve.

## Start here

1. Open [workshop/](workshop/) and follow the five-state workshop journey.
2. Open [tool-setup/](tool-setup/) when your team needs help using the repository with an AI tool or agent.
3. Open [skills/](skills/) when your team needs reusable AI guidance for the current workshop moment.
4. Use [references/](references/) only for optional background and further reading.

For coding agents that use repository instructions, start with [AGENTS.md](AGENTS.md).

## Workshop website

This repository also deploys a participant-facing workshop companion through GitHub Pages. It follows the full journey from Intent through Outcomes, places design guidance beside the decision it supports, and provides deeper step-by-step support for the Action and Outcomes laptop labs. The files in this repository remain the canonical source; open GitHub when you want to browse, edit or download them directly.

## What is here

<!--
| Folder or file | Use it for |
| --- | --- | --- |
| [workshop/](workshop/) | A numbered five-state journey, working templates, copyable prompts and challenge examples. |
| [skills/](skills/) | Reusable `SKILL.md` instructions that an AI agent can load or that you can paste into an AI conversation. |
| [tool-setup/](tool-setup/) | Copyable instructions for chat tools, VS Code and coding agents. |
| [references/](references/) | Optional links to related external work. |
| [AGENTS.md](AGENTS.md) | Instructions for an AI agent working in this repository. |

-->

<table>
	<thead>
		<tr>
			<th align="left">Folder or file</th>
			<th align="left">Use it for</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="workshop/">workshop/</a></td>
			<td>A numbered five-state journey, working templates, copyable prompts and challenge examples.</td>
		</tr>
		<tr>
			<td><a href="skills/">skills/</a></td>
			<td>Reusable <code>SKILL.md</code> instructions that an AI agent can load or that you can paste into an AI conversation.</td>
		</tr>
		<tr>
			<td><a href="tool-setup/">tool-setup/</a></td>
			<td>Copyable instructions for chat tools, VS Code and coding agents.</td>
		</tr>
		<tr>
			<td><a href="references/">references/</a></td>
			<td>Optional links to related external work.</td>
		</tr>
		<tr>
			<td><a href="AGENTS.md">AGENTS.md</a></td>
			<td>Instructions for an AI agent working in this repository.</td>
		</tr>
	</tbody>
</table>

## Working principles

- Keep one real workflow in view throughout the exercise.
- Share the work: one person can operate the tool while teammates challenge the draft and keep evidence in view.
- Use the shared workspace, AI tool or screen that suits the team.
- Test guidance against a stable task and use cited evidence to decide what to revise.
- Use material your team is authorised to put into an AI tool.

## Reuse

The repository is available under the [MIT License](LICENSE). Keep the license notice with substantial reuse.

## Agent Skill Discovery

The canonical skill library is [skills/](skills/). The `.agents/skills`, `.claude/skills` and `.github/skills` paths are relative symlinks to that same library for tools that scan those conventional locations. Do not edit through a compatibility path. GitHub Copilot also reads the root [AGENTS.md](AGENTS.md).
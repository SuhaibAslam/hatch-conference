# Work With Your AI Tool

Use any AI tool your team can access. Start with the workshop context, then choose the lightest setup your tool supports. The tool needs the relevant task, material, workshop guidance and skill; it does not need a special installation.

## Quick Start

Open the public repository: [github.com/SuhaibAslam/hatch-conference](https://github.com/SuhaibAslam/hatch-conference). If your AI tool can open web links, copy this into a new conversation:

```text
Read this workshop repository before helping us:
https://github.com/SuhaibAslam/hatch-conference

We are working on one AI-supported workflow. Help us follow workshop/00-start-here.md. Ask concise questions, use the relevant workshop file and skill, and keep confirmed evidence, assumptions and open questions separate. Make human authority, intervention and recovery explicit.

Our current state is:
[choose: Intent / Possibility / Definition / Action / Outcomes]

Our workflow or challenge is:
[add]
```

The agent will tell you which workshop file and skill to use next. You only need another setup route when your tool cannot open the link or needs files in a working folder.

## What is a skill?

A skill is a `SKILL.md` instruction for an AI agent. When your tool can load skills, give it the relevant skill file. When it cannot, paste the file with the task and workshop template; the instruction still works.

## Other setup routes

### Download a copy

You do not need to use a terminal.

1. Open [github.com/SuhaibAslam/hatch-conference](https://github.com/SuhaibAslam/hatch-conference).
2. Select the green **Code** button, then choose **Download ZIP**.
3. Open the downloaded ZIP file to unpack it.
4. Open the unpacked folder in your file browser, VS Code, or the AI tool that you are using.

### When the tool cannot open a repository link

Upload a ZIP or the relevant files, or paste the contents of these files into the conversation:

1. `AGENTS.md`
2. `workshop/00-start-here.md`
3. The workshop file for your current state
4. The skill you want to use from `skills/`

Then use the same prompt above without the URL.

### Tool-specific starting points

| Tool or setup | Start here |
| --- | --- |
| ChatGPT, Claude, Gemini or another chat tool | Share the public repository URL when supported. Otherwise upload the repository or paste the files listed above, then use the copyable prompt. |
| VS Code with GitHub Copilot | Open the unpacked repository folder in VS Code. Start a chat and ask the agent to read `AGENTS.md` and `workshop/00-start-here.md`, then name the current state. |
| Codex, Claude Code, Gemini CLI or another coding agent | Open the unpacked repository as the working folder. Ask the agent to read `AGENTS.md` and `workshop/00-start-here.md` before helping with the current state. |
| Any tool that does not load `SKILL.md` automatically | Open the relevant `SKILL.md`, paste it with the task and workshop file, and ask the tool to follow it. |

## Run the Outcomes trial

For the default Outcomes route, start a fresh agent conversation when possible and give the agent [run-skill-trial](../skills/run-skill-trial/SKILL.md), the target agent skill, the task and its input material. The agent runs the baseline before reading the target skill, runs the guided version, then returns the named outputs for review in Team Canvas 6, your shared workspace or the conversation itself. It then asks whether your team wants an interactive Comparison Desk. When you do, it can use [comparison-desk.html](../workshop/05-outcomes/comparison-desk.html) whenever that file is reachable, or create a standalone Desk in its working area when it can make files.

When your tool cannot load `SKILL.md` files, paste this with the target agent skill and task:

```text
Read and follow skills/run-skill-trial/SKILL.md.

Target agent skill:
[paste or attach the skill]

Task and input material:
[add]

Required output format:
[add]

Run the baseline before reading the target agent skill. Then run the guided version and return the baseline and guided outputs with clear labels for our evidence review. Ask whether we want an interactive Comparison Desk. If we do, use workshop/05-outcomes/comparison-desk.html when reachable, or create a simple standalone comparison-desk.html that keeps both outputs side by side, lets us score the four criteria with evidence, and records what changed plus the skill improvement decision. Do not make the Desk or JSON the only handoff.
```

Keep the task, input material, tool and output format the same. Change only the guidance. A clean baseline requires a conversation where the target skill has not already been loaded; otherwise label it as context-exposed.

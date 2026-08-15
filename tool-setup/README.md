# Work With Your AI Tool

Use any AI tool your team can access. Start with the workshop context, then choose the lightest setup your tool supports. The tool needs the relevant task, material, workshop guidance and skill; it does not need a special installation.

## Quick Start

Open the public repository: [github.com/SuhaibAslam/hatch-conference](https://github.com/SuhaibAslam/hatch-conference). If your AI tool can open web links, copy this into a new conversation:

```text
Read this workshop repository before helping us:
https://github.com/SuhaibAslam/hatch-conference

We are working on one AI-supported workflow. Help us follow workshop/00-start-here.md. Ask concise questions, use the relevant workshop file and skill, and keep confirmed evidence, assumptions and open questions separate. Make human authority, intervention and recovery explicit.

Our current state is:
[choose: Orient / Coordinate / Specify / Encode / Evaluate]

Our workflow or challenge is:
[add]
```

The agent will tell you which workshop file and skill to use next. You only need another setup route when your tool cannot open the link or needs files in a working folder.

## What is a skill?

A skill is a `SKILL.md` instruction for an AI agent. When your tool can load skills, give it the relevant skill file. When it cannot, paste the file with the task and workshop template; the instruction still works.

## Other setup routes

### Download a copy

Use this route without a terminal.

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

## Run the Evaluate trial

The default route uses 2 fresh AI conversations so the target skill cannot influence the baseline:

1. Open [prompt--run-and-review.md](../workshop/05-evaluate/prompt--run-and-review.md).
2. Run the baseline prompt in a fresh conversation that has never received the target skill.
3. Run the guided prompt in a second fresh conversation with the target skill attached or pasted.
4. Keep the 2 complete outputs visible and review them on Team Canvas 6.

An agent that can create genuinely isolated contexts may use [run-skill-trial](../skills/run-skill-trial/SKILL.md) to handle both runs. A new child agent is suitable only when it does not inherit the target skill or current conversation. When isolation is unavailable, the skill returns the same 2-conversation route.

When your agent can create genuinely isolated contexts, paste this with the target agent skill and task:

```text
Read and follow skills/run-skill-trial/SKILL.md.

Target agent skill:
[paste or attach the skill]

Task and input material:
[add]

Required output format:
[add]

Use 2 isolated contexts that do not inherit each other's instructions. Give the baseline context only the task, input material and required output format. Give the guided context the same material plus the target skill. Return both complete outputs with clear labels for our evidence review. If isolated execution is unavailable, return 2 ready-to-paste prompts for us to run in separate fresh conversations. Do not claim a clean baseline from a context that has seen the target skill.
```

Keep the task, input material, tool and output format the same. Change only whether the skill is present. Label any baseline influenced by the target skill as context-exposed.

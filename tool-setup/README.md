# Set Up Your AI Tool for the Workshop

Use any AI tool your team can access. The companion provides a workshop-context prompt and focused prompts for each state. Start with the lightest route that works in your tool.

## Fastest route

1. Open the participant companion.
2. Select **Copy workshop context** and paste it into a new AI conversation. The canonical copyable text is also available in [prompt--workshop-context.md](prompt--workshop-context.md).
3. Add your current state and challenge or workflow.
4. Return to the companion when you want the focused prompt for the state you are working in.

The copied context is self-contained. A tool that can open the public repository can read the linked guidance. A tool that cannot open links can still help from the pasted context and the material you add.

## What to share

Give the tool only what the current activity needs:

- your current workshop state;
- the relevant workbook or canvas notes;
- the task, example or authorised input material;
- the question on which you want another perspective.

Keep confirmed evidence, assumptions and open questions separate. Share only material your team is authorised to place in the selected tool.

## Optional repository access

Use one of these routes when direct access to the workshop files will help.

### Share the public link

Give the tool [github.com/SuhaibAslam/hatch-conference](https://github.com/SuhaibAslam/hatch-conference) and ask it to read `AGENTS.md` plus the guide for the current state.

### Download or upload the files

Open the repository, select the green **Code** button and choose **Download ZIP**. Unpack the folder for a coding agent, or upload the ZIP or relevant files to a chat tool.

When the tool cannot read the whole repository, provide only:

1. `AGENTS.md`;
2. `workshop/00-start-here.md`;
3. the guide or prompt for the current state;
4. the reference skill only when it answers a specific question.

## Prompts and agent skills

A prompt helps with one workshop move. An agent skill is a reusable `SKILL.md` file that can travel with a recurring task, decision or judgment. Some tools load a `SKILL.md` file directly. In other tools, paste the full skill with the task and input material.

During Encode, the team creates its own skill. The files under [skills/](../skills/) are optional patterns, not required exercises.

## Evaluate with a clean comparison

The default route uses 2 fresh AI conversations so the target skill cannot influence the baseline:

1. Copy the baseline prompt from the companion and run it in a fresh conversation that has never received the target skill.
2. Copy the guided prompt and run it in a second fresh conversation with the target skill attached or pasted.
3. Keep the task, input material, tool and required output format the same.
4. Save both complete outputs and review them on Team Canvas 6.

An agent that can create genuinely isolated contexts may follow [run-skill-trial](../skills/run-skill-trial/SKILL.md). When isolation is unavailable, use the 2 fresh-conversation route. Label any baseline influenced by the target skill as context-exposed.

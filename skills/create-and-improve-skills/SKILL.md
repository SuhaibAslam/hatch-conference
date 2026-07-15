---
name: create-and-improve-skills
description: Create or revise a reusable AI-workflow skill, then test it on realistic work and keep only the guidance that improves a meaningful outcome. Use when a team wants to turn a repeated design judgment into a SKILL.md file, improve an existing skill, choose test cases, compare a baseline and guided run, or decide whether a skill is worth keeping.
---

# Create and Improve Skills

## Define the job

Identify the repeated decision or critique the skill should protect. Ask for the workflow, person affected, available context, expected output, limits, human checkpoint and evidence of a useful result.

Do not create a skill for a one-off task. Create one when the guidance can help a team make the same kind of decision again.

## Draft the first version

Use the shared [template--portable-skill.md](../../workshop/04-action/template--portable-skill.md). Keep the guidance short and inspectable. Explain why a consequential instruction matters so the agent can apply it thoughtfully in a new situation.

Include:

- when to use the skill;
- required inputs and allowed context;
- an ordered procedure;
- limits and priority when requirements conflict;
- the human checkpoint;
- expected output and a criterion for judging it;
- what to do when evidence is missing, weak or conflicting.

## Choose realistic tests

Use the shared [template--skill-evaluation-plan.md](../../workshop/05-outcomes/template--skill-evaluation-plan.md). Choose two or three cases: normal work, an edge case and a difficult case. Write the task, material and qualities of a useful output before running them.

## Compare and revise

For each case, use [run-skill-trial](../run-skill-trial/SKILL.md) to run the baseline and guided version with the task, input, tool and output format held stable. Start a fresh agent session when a clean baseline matters. Review the named outputs and retain the evidence in your chosen workspace or [template--skill-evaluation-plan.md](../../workshop/05-outcomes/template--skill-evaluation-plan.md). The agent can use [comparison-desk.html](../../workshop/05-outcomes/comparison-desk.html) when it is reachable, or create a standalone Desk when an interactive review would help. Use [template--controlled-comparison.md](../../workshop/05-outcomes/template--controlled-comparison.md) only when you need the manual route.

Keep guidance that improves the agreed criterion. Remove wording that adds work without producing a meaningful improvement. Record the evidence and the next revision.

## Use in this workshop

Use this after the first controlled comparison when the team wants to keep developing its portable skill beyond the workshop.

## Explore further

Read [Anthropic's skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) for a more extensive skill-testing workflow.
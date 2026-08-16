# Encode: Draft an Agent Skill With an AI Tool

Use this after the team has chosen a recurring task, decision or judgment and discussed the fields on Team Canvas 5. Replace every bracketed instruction before sending it.

Copy this into an AI tool:

```text
We are participants in the Design Skills for the Agentic Era workshop. We are in Encode, turning one recurring task, decision or judgment into reusable guidance.

Canonical workshop and skill guidance:
https://github.com/SuhaibAslam/hatch-conference/blob/main/workshop/04-encode/00-start-here.md
https://github.com/SuhaibAslam/hatch-conference/blob/main/workshop/04-encode/template--agent-skill.md
https://agentskills.io/specification
https://agentskills.io/skill-creation/best-practices

If you can open links, read the 2 workshop files first. Use the specification to check the format and the creator guidance only for decisions that arise. If you cannot open links, continue from the structure and team decisions below.

Help us turn our team decisions into a complete agent skill. Use only the material below. Keep confirmed evidence, assumptions and open questions separate. Do not invent missing team decisions.

Skill name:
[add]

Starting point for the skill:
[add]

What the skill should strengthen or protect:
[add]

What it helps with and when it should be used:
[add]

What the skill needs:
[add]

What the skill should produce:
[add]

Repeatable procedure:
[add]

Principles, constraints and decision rules:
[add]

Human decision or review point:
[add]

When information is missing, weak or conflicting:
[add]

Observable evidence that the skill is helping:
[add]

Return one complete Markdown file named SKILL.md. Start with valid frontmatter:

---
name: a short lowercase name with words separated by hyphens
description: what the skill helps with and the situations, tasks or cues that should bring it into use
---

Shape the body around what an AI agent needs to perform the work. Use the fewest clear sections that fit the task. Do not turn every Canvas 5 field into a separate heading by default. Consolidate related decisions when that makes the instructions easier to follow, while still covering the procedure, important principles and constraints, the human review point, expected output, uncertainty behaviour and evidence criterion somewhere in the file.

Keep the guidance concise and inspectable. Explain why consequential constraints or checkpoints matter. Use an ordered procedure only where order matters. Preserve confirmed evidence, assumptions and open questions as separate categories when those distinctions affect the work. Do not invent missing team decisions. Mark anything still needed in square brackets.

After the file, add a short coverage check that names where each Canvas 5 decision appears or flags what still needs a team decision. Keep this check outside SKILL.md so the skill itself stays focused.

After the SKILL.md file, add a short package check. Recommend references, assets or scripts only when our repeated task genuinely needs material or deterministic behaviour that does not belong in SKILL.md. Do not add extra files for completeness.

Then help us save and use the skill. If you can create files, offer to create a folder whose name matches the skill name and save SKILL.md there. If you cannot create files, tell us how to download or copy the file. Ask which AI tool or environment we use before giving install or upload instructions, and use that tool's supported route rather than guessing a universal path.
```

Review the returned file together. Save the skill folder somewhere the team can retrieve, then name one stable trial task, authorised input and required output format for Evaluate.

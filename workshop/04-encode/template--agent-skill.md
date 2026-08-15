# Encode: Agent Skill Template

Use this with Team Canvas 5. Agree the content as a team, then keep the result in a file named `SKILL.md`. One person can type while teammates challenge the method, constraints and human review point. For AI help drafting the file, open [prompt--draft-guidance.md](prompt--draft-guidance.md).

Replace every bracketed instruction. Keep the name lowercase with words separated by hyphens. Write the description so an agent can tell when the skill applies.

```markdown
---
name: [short-skill-name]
description: [What the skill helps with and the situations, tasks or cues that should bring it into use.]
---

# [Skill title]

## Purpose

[What recurring task, decision or judgment this skill supports, and why it matters.]

## What the skill needs

[Required input, source material, context and permissions.]

## Procedure

1. [First repeatable step.]
2. [Next repeatable step.]
3. [Continue only as far as the method requires.]

## Principles, constraints and decision rules

[The judgment, boundaries, priorities and trade-offs the agent should follow.]

## Human decision or review point

[What a person must inspect, decide or approve, and when.]

## What the skill should produce

[The required result, structure or format.]

## Evidence the skill is helping

[The observable difference that would count as a useful improvement.]

## When information is missing, weak or conflicting

[How the agent should surface uncertainty, ask for help, limit the result or stop.]
```

## Ready for Evaluate when

- The `SKILL.md` file is saved somewhere the team can retrieve after the break.
- The team has one stable trial task, authorised input material and required output format.
- The team can name the evidence it expects to inspect, without assuming the skill will improve the result.

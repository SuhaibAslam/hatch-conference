---
name: constraint-specification
description: Turn a repeated design judgment into a reusable instruction with clear inputs, output expectations, priorities, boundaries and human checkpoints. Use when drafting or revising an agent skill, system guidance, prompt template, or AI-assisted workflow where vague requirements produce inconsistent results.
---

# Constraint Specification

## Purpose

Create guidance that gives an AI system enough structure to produce a reviewable result without hiding the design judgment from the people responsible for it.

## Start with the decision

Ask for:

- the decision or workflow the guidance supports;
- the person or team affected;
- required inputs and allowed context;
- expected output and who will review it;
- hard limits, preferences and trade-offs;
- the point where a person needs to decide or approve.

Keep confirmed evidence, assumptions and open questions distinct. That separation makes the output easier to challenge and revise.

## Draft the guidance

Use [template--agent-skill.md](../../workshop/04-encode/template--agent-skill.md). Write:

1. A purpose that names the design judgment the skill protects.
2. Inputs and context that the system may use.
3. A short ordered procedure.
4. Constraints with clear priority when they conflict. For example, accuracy may take priority over brevity.
5. The expected output format and an evaluation criterion.
6. A human checkpoint and a response to weak, missing or conflicting information.

Use examples when a boundary is difficult to infer. Explain why a constraint matters instead of adding long lists of generic prohibitions.

## Review before testing

Check that another person could answer these questions from the skill alone:

- What is this for?
- What information may it use?
- What should it return?
- Which limits take priority?
- When should a person step in?

## Workshop use

Use this skill while completing Team Canvas 5. Then run the same task without and with the resulting agent skill, using [00-start-here.md](../../workshop/05-evaluate/00-start-here.md).

## Explore further

Read [constraint specification in Owl AI Design Skills](https://github.com/Owl-Listener/ai-design-skills/tree/main/skills/prompt-architecture/constraint-specification).

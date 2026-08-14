---
name: run-skill-trial
description: Run an agent skill against the same task with and without the skill, then prepare the named outputs for human evidence review. Offer an optional interactive Comparison Desk when the team wants one and the tool can create or open it. Use whenever a participant asks to test a skill, compare a draft skill with ordinary tool use, evaluate what the guidance changed, or populate the workshop Outcomes comparison without manually managing two runs.
---

# Run a Skill Trial

## Purpose

Run the workshop's controlled comparison for the team. The team should not need to know how to stage two runs. You handle the mechanics; the team reviews the evidence in Team Canvas 6 or its chosen shared workspace and decides what to revise. An interactive Comparison Desk is an optional convenience, not a requirement.

## Collect the minimum information

Ask only for anything not already available:

- the target agent skill file or text;
- the task and input material;
- the required output format;
- the tool or model, when it matters to the result;
- any sensitive-material restriction.

Use the four workshop criteria unless the team has already agreed better ones:

1. **Task value:** solves the actual task for the people involved.
2. **Method and judgment:** follows the intended approach and makes consequential distinctions.
3. **Clarity and agency:** a person can understand, challenge and act on it.
4. **Handling uncertainty:** responds appropriately when information is missing, uncertain or difficult.

## Run the trial

### 1. Preserve a clean baseline

Run the task once **before reading the target skill's instructions**. Use only the task, input material and required output format. Do not add the target skill's rules, terms, examples or reasoning to this run.

If the target skill was already loaded into the agent's instructions or earlier context, say that a clean baseline is no longer possible in this conversation. Offer one of these routes:

- open a fresh chat or agent session for the baseline; or
- run the comparison with a clearly labelled **context-exposed baseline**.

Never describe a context-exposed baseline as clean.

### 2. Run the guided condition

Read the target skill. Run exactly the same task, input material and required output format with the skill applied. Do not change any other planned variable.

### 3. Prepare the review

Present the baseline and guided outputs to the team with clear labels, in the working folder or conversation they can already use. Leave scores and evidence blank: people, not the agent, make the workshop's evaluation decision.

After returning the named outputs, ask one concise question: **“Would you like an interactive Comparison Desk for the evidence review? It can take a little longer and needs a file or workspace that your team can open.”**

If the team says no, stop at the named outputs. If the team says yes:

- use the bundled `workshop/05-outcomes/comparison-desk.html` when the team or tool can open that file; or
- when the tool can create files but cannot open the bundled file, create a simple standalone `comparison-desk.html` in the team's working area.

The standalone Desk must be dependency-free and keep the named outputs side by side, provide the four workshop criteria with score and evidence fields, capture what changed, and support the Keep, Revise next, and Next case decision. It must let the team retain the review as Markdown or plain text. Do not score or write evidence for the team. State where the file was created and how the team can open it.

For either Desk, create a file named `comparison-desk-session.json` in the team's working folder. If the tool cannot create files, return the same JSON in one fenced `json` block after the labelled outputs. The JSON is an optional import format, not the only handoff.

```json
{
  "skillName": "Name of the agent skill",
  "task": "The task that both runs received",
  "tool": "Tool and model used, if known",
  "baseline": "Output created without the target skill",
  "guided": "Output created with the target skill",
  "meaningfullyBetter": "",
  "worseOrWeak": "",
  "learning": "",
  "keep": "",
  "reviseNext": "",
  "nextCase": "",
  "criteria": [
    {
      "name": "Task value",
      "baselineScore": "",
      "baselineEvidence": "",
      "guidedScore": "",
      "guidedEvidence": ""
    }
  ]
}
```

Include all four agreed criteria in `criteria`. Do not use `A`, `B`, hidden mappings or a reveal step.

## Hand off to the team

Tell the team only what they need next:

1. Keep the named outputs side by side in Team Canvas 6, the shared workspace or the conversation where they were returned.
2. Cite evidence and score both outputs. Record what became better, what became worse or stayed weak, and what the team learned.
3. Decide what to keep, what to revise next, and the next case and evidence to watch.
4. When the team chose an interactive Desk, open the bundled `workshop/05-outcomes/comparison-desk.html` when available, or the standalone Desk you created. They can select **Open trial** for the session file or **Paste trial** for returned JSON.

The Desk is a local review surface. Do not upload material or create a shared folder unless the team separately chooses to do so.

## Outcome

Finish with a concise note naming the outputs, any interactive Desk created, and any limitation that affects the comparison, especially a context-exposed baseline.

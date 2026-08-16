---
name: run-skill-trial
description: Run an agent skill against the same task in genuinely isolated baseline and guided contexts, or prepare a safe two-conversation route when isolation is unavailable. Use when a participant asks to test a skill, compare a draft skill with ordinary tool use, evaluate what the guidance changed, or populate the workshop Evaluate comparison.
---

# Run a Skill Trial

## Purpose

Run the workshop's controlled comparison when the tool can keep the baseline free of the target skill. Otherwise prepare the exact 2-conversation route for the team. Return named outputs for evidence review in Team Canvas 6 and prepare the bundled Comparison Desk when the team can open it.

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

## Choose a valid run route

### Route A: isolated agent runs

Use this route only when you can create 2 isolated contexts that do not inherit each other's instructions or hidden context.

1. Run the baseline in a clean context that receives only the task, input material and required output format. It must never receive the target skill's rules, terms, examples or reasoning.
2. Run the guided condition in a separate clean context that receives the same task, input material and required output format plus the target skill.
3. Return both complete outputs with the labels **Baseline: without the skill** and **Guided: with the skill**.

Do not treat a child agent as isolated when it inherits the current conversation or target skill.

### Route B: 2 fresh conversations

Use this route when genuinely isolated execution is unavailable. Return 2 ready-to-paste prompts:

1. A baseline prompt containing only the task, input material and required output format.
2. A guided prompt containing the same task, input material and required output format plus the full target skill.

Tell the team to run each prompt in a separate fresh conversation using the same tool and model, then bring the complete named outputs back for review. Do not generate either output in the current context and call the comparison clean.

### Context-exposed comparisons

If the target skill has already influenced the context used for the baseline, label it **Context-exposed baseline**. The result may still support a workshop discussion, but the team should not treat it as evidence of an uncontaminated without-skill condition.

## Prepare the review

When Route A was possible, present the baseline and guided outputs with clear labels. Leave scores and evidence blank for the team to complete. When Route B was required, stop after the 2 prompts and the concise instruction for returning the outputs. Continue after the team brings both complete outputs back.

Use the bundled `workshop/05-evaluate/comparison-desk.html` as the preferred digital review surface when the team can open that file. Prepare `comparison-desk-session.json` so the team can select **Open trial** and choose the file. If you return the JSON in chat instead, tell the team to select **Paste trial** and paste the complete fenced block.

When the bundled file is unavailable but the tool can create files, create a simple standalone `comparison-desk.html` beside the returned trial files. When neither digital route is possible, return the named outputs for Team Canvas 6.

The standalone Desk must be dependency-free and keep the named outputs side by side, provide the four workshop criteria with score and evidence fields, capture what changed, and support the Keep, Revise next, and Next case decision. It must let the team retain the review as Markdown or plain text. Do not score or write evidence for the team. State where the file was created and how the team can open it.

For either Desk, create a file named `comparison-desk-session.json` beside the outputs. If the tool cannot create files, return the same JSON in one fenced `json` block after the labelled outputs. Always return the named outputs directly; the JSON is an optional import format.

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

1. Keep the named outputs side by side in Team Canvas 6 or the Comparison Desk.
2. Cite evidence and score both outputs. Record what became better, what became worse or stayed weak, and what the team learned.
3. Decide what to keep, what to revise next, and the next case and evidence to watch.
4. Open the bundled `workshop/05-evaluate/comparison-desk.html` when available, or the standalone Desk you created. Select **Open trial** for the session file or **Paste trial** for returned JSON.

The Desk is a local review surface. Do not upload material unless the team separately chooses to do so.

## Outcome

Finish with a concise note naming the outputs, any interactive Desk created, and any limitation that affects the comparison, especially a context-exposed baseline.

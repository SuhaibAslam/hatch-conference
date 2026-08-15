# Evaluate: Run and Review a Skill Trial

Your team is testing what its agent skill changes in one real task.

## Start here

Follow these four steps in order. The team protects the comparison and makes the evidence and revision decision.

### 1. Prepare one stable case

Keep these four things ready:

- the task;
- authorised input material;
- the required output format;
- the `SKILL.md` file from Encode.

Keep the task, input material, tool and requested format the same across both runs.

### 2. Run the 2 conditions in fresh conversations

Open [prompt--run-and-review.md](prompt--run-and-review.md). Run the baseline prompt in a fresh conversation that has not received the skill. Run the guided prompt in a second fresh conversation with the skill attached or pasted. Save both complete outputs with clear labels.

This 2-conversation route works across ordinary AI chat tools. An agent that can create genuinely isolated contexts may follow [run-skill-trial](../../skills/run-skill-trial/SKILL.md) and return both named outputs instead. A run performed after the target skill was already in the same conversation is a **context-exposed baseline**, not a clean baseline.

### 3. Review both outputs together

Use Team Canvas 6 and your shared workspace or AI conversation to keep the baseline and guided outputs visible side by side. Cite the phrase, behaviour or omission that supports each score.

Use the bundled [comparison-desk.html](comparison-desk.html) only when an interactive workspace will make side-by-side scoring easier. Select **Open trial** when an agent created `comparison-desk-session.json`, or **Paste trial** when it returned the JSON in chat. Team Canvas 6 and the named outputs are sufficient for the workshop.

### 4. Decide the revision

Record what became meaningfully better, what became worse or stayed weak, and what you learned about the skill. Then decide what to keep, what to revise next, and the next case and evidence to watch.

## Only when needed

- Use [template--controlled-comparison.md](template--controlled-comparison.md) when your team wants a digital record of the comparison outside Canvas 6.
- If a live tool run is unavailable after four minutes, ask the facilitator for a fallback comparison page.
- Use [template--skill-evaluation-plan.md](template--skill-evaluation-plan.md) after the workshop when you want to improve the agent skill over several test cases.

## Keep material authorised

Use only material your team is allowed to place in the selected tool. When this is not possible, use a de-identified version or the facilitator fallback route.

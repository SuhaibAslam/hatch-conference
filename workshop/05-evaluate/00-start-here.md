# Evaluate: Run and Review a Skill Trial

Your team is testing what its agent skill changes in one real task.

## Start here

Open [run-skill-trial](../../skills/run-skill-trial/SKILL.md) in an AI agent and ask it to follow the skill. It will create 2 isolated runs when the tool can protect them. Otherwise it will return the safe prompts for 2 fresh conversations. The team protects the comparison and makes the evidence and revision decision.

### 1. Prepare one stable case

Keep these four things ready:

- the task;
- authorised input material;
- the required output format;
- the `SKILL.md` file from Encode.

Keep the task, input material, tool and requested format the same across both runs.

### 2. Run the 2 conditions

Ask the agent to follow [run-skill-trial](../../skills/run-skill-trial/SKILL.md). When it can create genuinely isolated contexts, it will run both conditions and return complete named outputs. When it cannot, it will give you the baseline and guided prompts from [prompt--run-and-review.md](prompt--run-and-review.md). Run those prompts in 2 fresh conversations using the same tool and model.

The 2-conversation route works across ordinary AI chat tools. A run performed after the target skill was already in the same conversation is a **context-exposed baseline**, not a clean baseline.

### 3. Review both outputs together

Use Team Canvas 6 to keep the baseline and guided outputs visible side by side. Cite the phrase, behaviour or omission that supports each score.

Use the bundled [Comparison Desk](comparison-desk.html) as the preferred digital review surface when your team can open it. Select **Open trial** when the agent saved a `comparison-desk-session.json` file. Select **Paste trial** when it returned the same trial data in a fenced JSON block. Team Canvas 6 and the named outputs remain a complete paper route.

### 4. Decide the revision

Record what became meaningfully better, what became worse or stayed weak, and what you learned about the skill. Then decide what to keep, what to revise next, and the next case and evidence to watch.

## Only when needed

- Use [template--controlled-comparison.md](template--controlled-comparison.md) when your team wants a digital record of the comparison outside Canvas 6.
- If a live tool run is unavailable after four minutes, ask the facilitator for a fallback comparison page.
- Use [template--skill-evaluation-plan.md](template--skill-evaluation-plan.md) after the workshop when you want to improve the agent skill over several test cases.

## Keep material authorised

Use only material your team is allowed to place in the selected tool. When this is not possible, use a de-identified version or the facilitator fallback route.

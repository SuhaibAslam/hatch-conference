# Evaluate: Run and Review a Skill Trial

Your team is testing what its agent skill changes in one real task.

## Start here

Ask the AI tool to follow [run-skill-trial](../../skills/run-skill-trial/SKILL.md) whenever it can use agent skills or open the linked instructions. This is the preferred route. It creates 2 genuinely isolated runs through separate sub-agents or agent threads when the tool can protect them. Otherwise, it returns the safe prompts for 2 fresh conversations.

Copy the [Evaluate trial prompt](prompt--trial-assistant.md) when you want a ready-to-paste way to start that route. It gives the AI tool the workshop context, points it to `run-skill-trial`, protects the baseline and guided conditions and prepares the Comparison Desk material.

### 1. Prepare one stable case

Keep these four things ready:

- the task;
- authorised input material;
- the required output format;
- the `SKILL.md` file from Encode.

Keep the task, input material, tool and requested format the same across both runs.

### 2. Run the 2 conditions

Ask the agent to follow [run-skill-trial](../../skills/run-skill-trial/SKILL.md). When it can create genuinely isolated sub-agent contexts or agent threads, it will run both conditions and return complete named outputs. When it cannot guarantee that separation, it will give you the baseline and guided prompts from [prompt--run-and-review.md](prompt--run-and-review.md). Run those prompts in 2 fresh conversations using the same tool and model.

The 2-conversation route works across ordinary AI chat tools. A run performed after the target skill was already in the same conversation is a **context-exposed baseline**, not a clean baseline.

### 3. Review both outputs together

Use the bundled [Comparison Desk](comparison-desk.html) as the preferred review surface. Select **Open trial** when the agent saved a `comparison-desk-session.json` file. Select **Paste trial** when it returned the same trial data in a fenced JSON block. Keep Team Canvas 6 beside it for the team decision.

Keep the baseline and guided outputs visible side by side. Cite the phrase, behaviour or omission that supports each score. If the Desk cannot be opened, the named outputs and Team Canvas 6 remain a complete route.

### 4. Decide the revision

Record what became meaningfully better, what became worse or stayed weak, and what you learned about the skill. Then decide what to keep, what to revise next, and the next case and evidence to watch.

## Other useful routes

- Use [template--controlled-comparison.md](template--controlled-comparison.md) when your team wants a digital record of the comparison outside Canvas 6.
- Open the [prepared fallback comparison](fallback-comparison-desk.html) when the team needs a ready-made case. It uses sample material and keeps the evidence review intact.
- Use [template--skill-evaluation-plan.md](template--skill-evaluation-plan.md) after the workshop when you want to improve the agent skill over several test cases.

## Keep material authorised

Use only material your team is allowed to place in the selected tool. When this is not possible, use a de-identified version or the facilitator fallback route.

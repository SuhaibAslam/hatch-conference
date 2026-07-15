# Outcomes: Run and Review a Skill Trial

Your team is testing whether its portable skill improves one real task.

## Start here

Follow these three steps in order. The agent handles the two runs; the team makes the evidence and revision decision.

### 1. Ask the agent to run the trial

Give the agent [run-skill-trial](../../skills/run-skill-trial/SKILL.md), your portable skill, the task, input material and required output format.

The agent runs the baseline before reading the portable skill, then runs the guided version. Start a fresh agent conversation when possible. If the portable skill is already in the agent's context, the agent must label the baseline as context-exposed rather than clean.

### 2. Review both outputs together

Use Team Canvas 6 and your shared workspace or AI conversation to keep the baseline and guided outputs visible side by side. Cite the phrase, behaviour or omission that supports each score.

After the agent returns both outputs, it can ask whether the team wants an interactive Comparison Desk. Choose it only when it will help the review and your tool can create or open a file. The agent can use the bundled [comparison-desk.html](comparison-desk.html) whenever it is reachable, or create a standalone Desk in the team's working area. Select **Open trial** when the agent created `comparison-desk-session.json`, or **Paste trial** when it returned the JSON in chat. You do not need the Desk to complete the workshop.

### 3. Decide the revision

Record:

- one improvement;
- one regression or cost;
- one next revision.

## Only when needed

- Use [template--controlled-comparison.md](template--controlled-comparison.md) and [prompt--run-and-review.md](prompt--run-and-review.md) only when your team must run the comparison manually.
- If a live tool run is unavailable after four minutes, ask the facilitator for a fallback comparison page.
- Use [template--skill-evaluation-plan.md](template--skill-evaluation-plan.md) after the workshop when you want to improve the skill over several test cases.

## Keep material authorised

Use only material your team is allowed to place in the selected tool. When this is not possible, use a de-identified version or the facilitator fallback route.
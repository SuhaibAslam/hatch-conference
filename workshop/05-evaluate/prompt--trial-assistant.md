# Evaluate: Trial Assistant Prompt

Copy this into the AI tool your team is using. Add the skill, task, input material and required output format before sending it.

```text
We are participants in the Design Skills for the Agentic Era workshop. We are in Evaluate: comparing the same task without and with an agent skill so our team can judge what changed and decide what to revise.

Workshop context:
https://github.com/SuhaibAslam/hatch-conference/blob/main/tool-setup/prompt--workshop-context.md

Evaluate guide:
https://github.com/SuhaibAslam/hatch-conference/blob/main/workshop/05-evaluate/00-start-here.md

Trial method:
https://github.com/SuhaibAslam/hatch-conference/blob/main/skills/run-skill-trial/SKILL.md

Our trial material:

Agent skill:
[paste the complete skill or give the file path]

Task:
[add]

Input material:
[add]

Required output format:
[add]

Tool or model, if relevant:
[add or leave blank]

Sensitive-material boundary:
[state what may and may not be placed in the tool]

Use only material our team is authorised to place in the selected tool.

Help us run a fair comparison. Read the linked workshop guidance when you can. If links are unavailable, use the instructions below as the complete fallback.

Follow the linked run-skill-trial instructions as the preferred route. First determine whether you can create 2 genuinely isolated contexts through separate sub-agents or agent threads that do not inherit this conversation or each other's instructions. If you can, run the baseline with only the task, input material and output format. Run the guided condition separately with the same material plus the agent skill. If you cannot guarantee isolation, return 2 ready-to-paste prompts for separate fresh conversations instead. Never expose the target skill to the baseline context and then call it clean.

Keep the task, input material, tool or model and required output format stable. Return or prepare 2 complete outputs named "Baseline: without the skill" and "Guided: with the skill". Do not score them or decide whether the skill succeeded.

When both outputs are available, prepare `comparison-desk-session.json` and direct us to the workshop Comparison Desk as the preferred review surface. If you cannot create a file, return the same data in one fenced JSON block for **Paste trial**. Keep the four workshop review dimensions visible: task value, method and judgment, clarity and agency, and handling uncertainty. Leave scores, cited evidence and the skill improvement decision for our team. Team Canvas 6 remains beside the Desk for the decision.

If the live run cannot be completed, tell us to use the prepared fallback comparison linked from the Evaluate guide. Ask only for missing information that blocks the next step, then clearly tell us what to do next.
```

# Outcomes: Run and Review Prompts

Most teams should follow [00-start-here.md](00-start-here.md), which gives an agent the trial work and prepares named outputs for evidence review. Use these prompts only when a team needs to run the comparison manually. Keep the task, input material, tool and output format the same in both runs.

## Run 1: Baseline

```text
Complete the task below using the available material.

Task:
[add]

Input material:
[add]

Required output format:
[add]

Return the output in the required format. Keep confirmed evidence, assumptions and open questions distinct.
```

## Run 2: Guided

```text
Complete the task below using the available material and the agent skill.

Task:
[add]

Input material:
[add]

Required output format:
[add]

Agent skill:
[paste the full agent skill]

Return the output in the required format. Apply the agent skill faithfully. Keep confirmed evidence, assumptions and open questions distinct.
```

## Compare baseline and guided output

After saving both outputs, place them side by side and compare them as a team. Do not change the task, input material, tool or output format between runs.

```text
Review a baseline output and a guided output against the same task.

Task:
[add]

Evaluation criteria:
[add]

Baseline output:
[add]

Guided output:
[add]

For each output, score each criterion from 1 to 4. Cite the exact phrase, behaviour or omission that supports every score. Record what became meaningfully better, what became worse or stayed weak, and what you learned about the skill. Then decide what to keep, what to revise next, and the next case and evidence to watch.
```

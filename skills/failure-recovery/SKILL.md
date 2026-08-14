---
name: failure-recovery
description: Design a clear response when an AI system, tool, input or handoff fails: identify the failure, choose retry, fallback, escalation or graceful degradation, and tell the person what happened and what they can do. Use when mapping edge cases, recovery steps, handoffs, tool failures, partial results or escalation rules.
---

# Failure Recovery

## Use this when

The workflow could fail through weak input, an unavailable tool, an invalid output, a lost handoff or a decision the system should not make alone.

## Design the recovery path

For each failure that matters, decide:

- what could fail and the first sign that it has failed;
- whether a limited retry is appropriate;
- the fallback route if retry does not work;
- when a person must take over or make a decision;
- what partial result can still be safely useful;
- what needs recording so the team can learn from the problem.

Use retry for temporary problems. Use a fallback when another route can still achieve the task. Escalate when authority, evidence or safety is missing. Undo or contain a partial action before retrying when it could otherwise create a larger problem.

## Tell people what happened

Keep recovery invisible only when it is quick, low-risk and does not change the person’s options. Otherwise, explain the problem, the current recovery step and the choice available to the person. An honest partial result is better than a polished claim that hides what failed.

## Check before you continue

Confirm that the team can name the trigger, recovery step, escalation point, person-facing message and record for every material failure.

## Workshop use

Use this when completing how work resumes or recovers on Canvas 2, the critical-moment recovery route on Canvas 3, or the next case and evidence to watch on Canvas 6.

## Explore further

Read [failure recovery in Owl AI Design Skills](https://github.com/Owl-Listener/ai-design-skills/tree/main/skills/design-agent-orchestration/failure-recovery).

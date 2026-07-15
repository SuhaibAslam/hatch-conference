# Starting Challenge: Service Request Triage

## Context

A service team receives requests through several channels. People lose time forwarding requests, while urgent issues are sometimes grouped with routine questions.

## Challenge

Design AI-supported triage that suggests a route and priority while showing the evidence, uncertainty and point where a person takes over.

## Available material

- a sample of recent requests;
- the current routing rules;
- priority definitions;
- service-level targets and escalation contacts.

## Conditions to design

- People can see why the system suggested a route or priority.
- A person can change the route, priority or category before a consequential handoff.
- Low-confidence or high-impact requests receive the right escalation.

## Useful skills

- [Transparency patterns](../../../skills/transparency-patterns/SKILL.md): show the information, uncertainty and next step that affect the routing decision.
- [Failure recovery](../../../skills/failure-recovery/SKILL.md): define what happens when information is missing, the route is unclear or the handoff fails.
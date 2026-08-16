const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];
const participantRoots = ['README.md', 'AGENTS.md', 'workshop', 'skills', 'tool-setup', 'references', 'site'];

function filesUnder(target) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap(entry => filesUnder(path.join(target, entry.name)));
}

function relative(absolute) {
  return path.relative(root, absolute).split(path.sep).join('/');
}

function fail(message) {
  failures.push(message);
}

const sourceFiles = participantRoots.flatMap(filesUnder).filter(file => /\.(md|html|js|css|yml)$/.test(file));

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('\u2014')) fail(`${relative(file)} contains an em dash.`);
}

for (const file of sourceFiles.filter(file => file.endsWith('.md'))) {
  const source = fs.readFileSync(file, 'utf8');
  const links = [...source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(match => match[1].split(/\s+/)[0]);
  for (const href of links) {
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
    let target = path.resolve(path.dirname(file), clean);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      const readme = path.join(target, 'README.md');
      const start = path.join(target, '00-start-here.md');
      target = fs.existsSync(readme) ? readme : start;
    }
    if (!fs.existsSync(target)) fail(`${relative(file)} links to missing ${href}.`);
  }
}

const requiredPaths = [
  'workshop/00-start-here.md',
  'workshop/01-orient/guidance--find-the-judgment.md',
  'workshop/01-orient/prompt--thinking-partner.md',
  'workshop/02-coordinate/guidance--agency-and-control.md',
  'workshop/02-coordinate/prompt--thinking-partner.md',
  'workshop/03-specify/00-start-here.md',
  'workshop/03-specify/prompt--thinking-partner.md',
  'workshop/03-specify/template--working-specification.md',
  'workshop/04-encode/00-start-here.md',
  'workshop/04-encode/template--agent-skill.md',
  'workshop/04-encode/prompt--draft-guidance.md',
  'workshop/05-evaluate/00-start-here.md',
  'workshop/05-evaluate/prompt--trial-assistant.md',
  'workshop/05-evaluate/prompt--run-and-review.md',
  'workshop/05-evaluate/comparison-desk.html',
  'workshop/05-evaluate/fallback-comparison-desk.html',
  'skills/create-and-improve-skills/SKILL.md',
  'skills/run-skill-trial/SKILL.md',
  'tool-setup/prompt--workshop-context.md'
];
for (const target of requiredPaths) if (!fs.existsSync(path.join(root, target))) fail(`Required path is missing: ${target}.`);

for (const oldPath of ['workshop/01-intent', 'workshop/02-possibility', 'workshop/03-definition', 'workshop/04-action', 'workshop/05-outcomes']) {
  if (fs.existsSync(path.join(root, oldPath))) fail(`Legacy state path remains: ${oldPath}.`);
}

const index = fs.readFileSync(path.join(root, 'site/index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'site/app.js'), 'utf8');
const markdownResources = new Set(['workshop', 'skills', 'tool-setup', 'references'].flatMap(filesUnder).filter(file => file.endsWith('.md')).map(relative));
for (const match of index.matchAll(/data-resource="([^"]+)"/g)) {
  if (!markdownResources.has(match[1])) fail(`site/index.html opens a resource missing from the content bundle: ${match[1]}.`);
}

for (const state of ['orient', 'coordinate', 'specify', 'encode', 'evaluate']) {
  if (!index.includes(`href="#${state}"`)) fail(`Companion navigation is missing ${state}.`);
  if (!index.includes(`id="${state}"`)) fail(`Companion section is missing ${state}.`);
}

const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
for (const id of new Set(ids)) {
  if (ids.filter(candidate => candidate === id).length > 1) fail(`site/index.html contains duplicate id ${id}.`);
}
for (const target of [...index.matchAll(/href="#([^"]+)"/g)].map(match => match[1])) {
  if (!ids.includes(target)) fail(`site/index.html links to missing section #${target}.`);
}
if (!app.includes('contentFileHref')) fail('The companion does not resolve production and source-preview file routes.');
if (!app.includes("contentFileHref('workshop/05-evaluate/comparison-desk.html')")) fail('The Comparison Desk route is missing.');
if (!app.includes('<table><thead><tr>')) fail('Resource tables are missing semantic header rows.');
if (!index.includes('data-back')) fail('The resource dialog is missing a Back action.');
if (!app.includes('resourceHistory')) fail('The resource dialog does not preserve nested-resource history.');
if (!app.includes('data-copy-code')) fail('Rendered code blocks are missing a direct copy affordance.');
if (!app.includes('guideActions')) fail('State guides are missing embedded primary actions.');

for (const action of ['quickstart', 'orient', 'coordinate', 'specify', 'draft', 'evaluate']) {
  if (!index.includes(`data-copy-action="${action}"`)) fail(`Companion is missing the ${action} copy action.`);
  if (!app.includes(action === 'quickstart' ? "action === 'quickstart'" : `${action}: {`)) fail(`site/app.js does not handle the ${action} copy action.`);
}
if (!index.includes('data-copy-action="evaluate"')) fail('Evaluate does not provide a ready-to-paste trial action.');
if (!index.includes('data-resource="workshop/05-evaluate/prompt--run-and-review.md"')) fail('Evaluate is missing the 2-conversation fallback.');
if (!index.includes('data-resource="skills/README.md"')) fail('Encode is missing the reference-skill route.');
const evaluateGuide = fs.readFileSync(path.join(root, 'workshop/05-evaluate/00-start-here.md'), 'utf8');
if (!evaluateGuide.includes('../../skills/run-skill-trial/SKILL.md')) fail('Evaluate guide does not retain the Run skill trial route.');

for (const promptPath of [
  'tool-setup/prompt--workshop-context.md',
  'workshop/01-orient/prompt--thinking-partner.md',
  'workshop/02-coordinate/prompt--thinking-partner.md',
  'workshop/03-specify/prompt--thinking-partner.md',
  'workshop/05-evaluate/prompt--trial-assistant.md'
]) {
  const promptSource = fs.readFileSync(path.join(root, promptPath), 'utf8');
  const blocks = [...promptSource.matchAll(/```text\n([\s\S]*?)\n```/g)].map(match => match[1]);
  if (blocks.length !== 1) fail(`${promptPath} must contain one ready-to-paste text block.`);
  const prompt = blocks[0] || '';
  for (const marker of ['Design Skills for the Agentic Era', '[add]']) {
    if (!prompt.includes(marker)) fail(`${promptPath} is missing self-contained prompt marker: ${marker}.`);
  }
  if (!prompt.includes('https://github.com/SuhaibAslam/hatch-conference/blob/main/')) fail(`${promptPath} is missing canonical repository guidance.`);
  if (!/Use only (the )?material/.test(prompt)) fail(`${promptPath} does not protect the authorised material boundary.`);
}

const evaluatePrompts = fs.readFileSync(path.join(root, 'workshop/05-evaluate/prompt--run-and-review.md'), 'utf8');
const evaluateBlocks = [...evaluatePrompts.matchAll(/```text\n([\s\S]*?)\n```/g)].map(match => match[1]);
if (evaluateBlocks.length < 2) fail('Evaluate needs separate baseline and guided prompt blocks.');
if (!evaluatePrompts.includes('2 fresh AI conversations')) fail('Evaluate does not state the clean 2-conversation route.');
if (/agent skill/i.test(evaluateBlocks[0] || '')) fail('Baseline prompt exposes the target skill.');
if (!/agent skill/i.test(evaluateBlocks[1] || '')) fail('Guided prompt does not request the target skill.');
for (const marker of ['Task:', 'Input material:', 'Required output format:']) {
  if (!(evaluateBlocks[0] || '').includes(marker) || !(evaluateBlocks[1] || '').includes(marker)) fail(`Both Evaluate prompts must contain ${marker}`);
}

const encodePrompt = fs.readFileSync(path.join(root, 'workshop/04-encode/prompt--draft-guidance.md'), 'utf8');
for (const field of ['Starting point for the skill', 'What the skill should strengthen or protect', 'What the skill needs', 'What the skill should produce', 'Repeatable procedure', 'Principles, constraints and decision rules', 'Human decision or review point', 'When information is missing, weak or conflicting', 'Observable evidence that the skill is helping']) {
  if (!encodePrompt.includes(field)) fail(`Encode drafting prompt is missing Canvas 5 field: ${field}.`);
}
if (!encodePrompt.includes('Return one complete Markdown file named SKILL.md.')) fail('Encode drafting prompt does not request a complete SKILL.md file.');
if (!encodePrompt.includes('https://agentskills.io/specification')) fail('Encode drafting prompt does not link the Agent Skills specification.');
if (!encodePrompt.includes('Ask which AI tool or environment we use')) fail('Encode drafting prompt does not provide tool-aware save and install guidance.');
if (!encodePrompt.includes('Do not turn every Canvas 5 field into a separate heading by default.')) fail('Encode drafting prompt does not translate Canvas 5 into a focused skill structure.');

const trialSkill = fs.readFileSync(path.join(root, 'skills/run-skill-trial/SKILL.md'), 'utf8');
if (!trialSkill.includes('isolated sub-agent or agent-thread runs')) fail('Run skill trial does not prefer isolated sub-agent or agent-thread conditions.');
if (!trialSkill.includes('Route B: 2 fresh conversations')) fail('Run skill trial has no safe route when isolation is unavailable.');
if (!trialSkill.includes('preferred review surface')) fail('Run skill trial does not prefer the bundled Comparison Desk.');

const comparisonDesk = fs.readFileSync(path.join(root, 'workshop/05-evaluate/comparison-desk.html'), 'utf8');
if (!comparisonDesk.includes('id="copy-ai-instructions"')) fail('Comparison Desk is missing its AI-instructions action.');
if (!comparisonDesk.includes('skills/run-skill-trial/SKILL.md')) fail('Comparison Desk AI instructions do not point to Run skill trial.');

const fallbackDesk = fs.readFileSync(path.join(root, 'workshop/05-evaluate/fallback-comparison-desk.html'), 'utf8');
for (const marker of ['Prepared fallback comparison', 'Reveal conditions', 'Baseline, without the skill', 'Guided, with the skill', 'Download review', 'Research decision', 'Component standard', 'Meeting preparation', 'Service recovery']) {
  if (!fallbackDesk.includes(marker)) fail(`Prepared fallback comparison is missing: ${marker}.`);
}

for (const skillFile of filesUnder('skills').filter(file => file.endsWith('SKILL.md'))) {
  const source = fs.readFileSync(skillFile, 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail(`${relative(skillFile)} has no YAML frontmatter.`);
    continue;
  }
  if (!/^name:\s*\S+/m.test(frontmatter[1])) fail(`${relative(skillFile)} has no name in frontmatter.`);
  if (!/^description:\s*\S+/m.test(frontmatter[1])) fail(`${relative(skillFile)} has no description in frontmatter.`);
}

if (failures.length) {
  console.error(failures.map(message => `- ${message}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${sourceFiles.length} participant-facing source files, ${markdownResources.size} bundled Markdown resources and ${filesUnder('skills').filter(file => file.endsWith('SKILL.md')).length} skills.`);

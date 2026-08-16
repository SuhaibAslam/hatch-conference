const repositoryUrl = 'https://github.com/SuhaibAslam/hatch-conference';
const dialog = document.querySelector('#resource-dialog');
const resourceContent = document.querySelector('#resource-content');
const resourceTitle = document.querySelector('#resource-title');
const resourceKind = document.querySelector('#resource-kind');
const resourceSource = document.querySelector('#resource-source');
const copyResourceButton = document.querySelector('[data-copy-resource]');
const backButton = document.querySelector('[data-back]');
const toast = document.querySelector('#toast');

let activeContent = '';
let activeCopyLabel = 'Guidance';
let resourceHistory = [];

const promptActions = {
  orient: {
    title: 'Orient thinking prompt',
    path: 'workshop/01-orient/prompt--thinking-partner.md',
    index: 0,
    message: 'Orient prompt copied. Add your context before pasting it into your AI tool.'
  },
  coordinate: {
    title: 'Coordinate thinking prompt',
    path: 'workshop/02-coordinate/prompt--thinking-partner.md',
    index: 0,
    message: 'Coordinate prompt copied. Add your context before pasting it into your AI tool.'
  },
  specify: {
    title: 'Specify thinking prompt',
    path: 'workshop/03-specify/prompt--thinking-partner.md',
    index: 0,
    message: 'Specify prompt copied. Add your context before pasting it into your AI tool.'
  },
  draft: {
    title: 'Encode skill-drafting prompt',
    path: 'workshop/04-encode/prompt--draft-guidance.md',
    index: 0,
    message: 'Drafting prompt copied. Add your context before pasting it into your AI tool.'
  }
};

const guideActions = {
  'workshop/01-orient/guidance--find-the-judgment.md': {
    heading: 'Sharpen the judgment',
    state: 'orient',
    html: '<button class="button button-ai" type="button" data-copy-action="orient">Copy an Orient thinking prompt</button>'
  },
  'workshop/02-coordinate/guidance--agency-and-control.md': {
    heading: 'Decide together',
    state: 'coordinate',
    html: '<button class="button button-ai" type="button" data-copy-action="coordinate">Copy a Coordinate thinking prompt</button>'
  },
  'workshop/03-specify/00-start-here.md': {
    heading: '4. Map and review the workflow',
    state: 'specify',
    html: '<button class="button button-ai" type="button" data-copy-action="specify">Copy a Specify thinking prompt</button>'
  },
  'workshop/04-encode/00-start-here.md': {
    heading: '3. Draft and inspect the file',
    state: 'encode',
    html: '<button class="button button-ai" type="button" data-copy-action="draft">Copy the skill-drafting prompt</button>'
  },
  'workshop/05-evaluate/00-start-here.md': {
    heading: 'Start here',
    state: 'evaluate',
    html: '<button class="button button-ai" type="button" data-resource="skills/run-skill-trial/SKILL.md">Run the skill trial</button>'
  }
};

function escapeHtml(value = '') {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function humanize(label) {
  if (!/\.(md|html)$/i.test(label)) return label;
  return label.split('/').pop().replace(/\.(md|html)$/i, '').replace(/^SKILL$/i, 'Full instructions').replace(/^(guidance|template|prompt|examples)--/i, '$1: ').replaceAll('--', ': ').replaceAll('-', ' ');
}

function inlineMarkdown(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, label, href) => `<a href="${href}">${humanize(label)}</a>`);
}

function renderMarkdown(markdown) {
  const clean = markdown.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/\r/g, '');
  let html = '', list = '', code = false, table = false;
  const closeList = () => { if (list) html += `</${list}>`; list = ''; };
  const closeTable = () => { if (table) html += '</tbody></table>'; table = false; };
  for (const line of clean.split('\n')) {
    if (line.startsWith('```')) { closeList(); closeTable(); code = !code; html += code ? '<div class="code-block"><button class="copy-code" type="button" data-copy-code>Copy</button><pre><code>' : '</code></pre></div>'; continue; }
    if (code) { html += `${escapeHtml(line)}\n`; continue; }
    if (/^\|/.test(line) && /\|$/.test(line)) {
      closeList();
      const cells = line.slice(1, -1).split('|').map(cell => cell.trim());
      if (cells.every(cell => /^:?-{3,}:?$/.test(cell))) continue;
      if (!table) {
        html += `<table><thead><tr>${cells.map(cell => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>`;
        table = true;
      } else html += `<tr>${cells.map(cell => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`;
      continue;
    }
    closeTable();
    if (!line.trim()) { closeList(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) { closeList(); const level = heading[1].length; html += `<h${level}>${inlineMarkdown(heading[2])}</h${level}>`; continue; }
    const item = line.match(/^[-*]\s+(.+)$/), ordered = line.match(/^\d+\.\s+(.+)$/);
    if (item || ordered) {
      const type = ordered ? 'ol' : 'ul';
      if (list !== type) { closeList(); list = type; html += `<${type}>`; }
      html += `<li>${inlineMarkdown((item || ordered)[1])}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inlineMarkdown(line)}</p>`;
  }
  closeList(); closeTable();
  return html;
}

function showToast(message) {
  if (dialog.open && toast.parentElement !== dialog) dialog.append(toast);
  if (!dialog.open && toast.parentElement !== document.body) document.body.append(toast);
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

async function copyText(text, message) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  showToast(message);
}

function codeBlocks(path) {
  const source = window.WORKSHOP_CONTENT?.[path] || '';
  return [...source.matchAll(/```(?:text|markdown)?\n([\s\S]*?)\n```/g)].map(match => match[1]);
}

function workshopContext() {
  return codeBlocks('tool-setup/prompt--workshop-context.md')[0] || '';
}

function showDialog() {
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}

function updateBackButton() {
  backButton.hidden = resourceHistory.length < 2;
}

function resolveBundledLink(path, href) {
  const target = new URL(href, `https://workshop.local/${path}`).pathname.slice(1);
  if (window.WORKSHOP_CONTENT?.[target]) return target;
  const readme = `${target.replace(/\/$/, '')}/README.md`;
  return window.WORKSHOP_CONTENT?.[readme] ? readme : '';
}

function insertGuideAction(path) {
  const config = guideActions[path];
  if (!config) return;
  const heading = [...resourceContent.querySelectorAll('h2, h3')].find(item => item.textContent.trim() === config.heading);
  if (!heading) return;
  let anchor = heading;
  while (anchor.nextElementSibling && !/^H[123]$/.test(anchor.nextElementSibling.tagName)) anchor = anchor.nextElementSibling;
  anchor.insertAdjacentHTML('afterend', `<div class="guide-actions ${config.state}">${config.html}</div>`);
}

function renderResource(path) {
  const markdown = window.WORKSHOP_CONTENT?.[path];
  if (!markdown) { showToast('This guidance is not available in the workshop bundle.'); return false; }
  const clean = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  resourceTitle.textContent = clean.match(/^#\s+(.+)$/m)?.[1] || 'Workshop guidance';
  resourceKind.textContent = path.includes('/SKILL.md') ? 'Design guidance' : 'Workshop material';
  resourceSource.hidden = false;
  resourceSource.href = `${repositoryUrl}/blob/main/${path}`;
  copyResourceButton.textContent = 'Copy this guidance';
  activeContent = markdown;
  activeCopyLabel = 'Guidance';
  resourceContent.innerHTML = renderMarkdown(markdown);
  if (path === 'tool-setup/README.md') {
    resourceContent.insertAdjacentHTML('afterbegin', '<div class="guide-actions"><button class="button button-ai" type="button" data-copy-action="quickstart">Copy workshop context</button></div>');
  }
  insertGuideAction(path);
  resourceContent.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (/^(https?:|mailto:|#)/.test(href)) return;
    const bundled = resolveBundledLink(path, href);
    if (bundled) {
      link.href = '#';
      link.addEventListener('click', event => {
        event.preventDefault();
        openResource(bundled, true);
      });
    } else {
      const target = new URL(href, `https://workshop.local/${path}`).pathname.slice(1);
      link.href = location.protocol === 'file:' ? `../${target}` : `content/${target}`;
    }
  });
  updateBackButton();
  showDialog();
  return true;
}

function openResource(path, preserveHistory = false) {
  if (!preserveHistory) resourceHistory = [];
  if (resourceHistory.at(-1) !== path) resourceHistory.push(path);
  if (!renderResource(path)) resourceHistory.pop();
}

function openPreviousResource() {
  if (resourceHistory.length < 2) return;
  resourceHistory.pop();
  renderResource(resourceHistory.at(-1));
}

function openPromptPreview({ title, text, path = '', intro = '', preserveHistory = false }) {
  if (!preserveHistory) resourceHistory = [];
  else resourceHistory.push(`prompt:${path || title}`);
  resourceTitle.textContent = title;
  resourceKind.textContent = 'Ready-to-paste AI prompt';
  resourceSource.hidden = !path;
  if (path) resourceSource.href = `${repositoryUrl}/blob/main/${path}`;
  copyResourceButton.textContent = 'Copy prompt';
  activeContent = text;
  activeCopyLabel = 'Prompt';
  resourceContent.innerHTML = `${intro ? `<p class="prompt-intro">${escapeHtml(intro)}</p>` : ''}<div class="code-block"><button class="copy-code" type="button" data-copy-code>Copy</button><pre><code>${escapeHtml(text)}</code></pre></div>`;
  updateBackButton();
  showDialog();
}

async function handleCopyAction(action, preserveHistory = false) {
  if (action === 'quickstart') {
    const text = workshopContext();
    openPromptPreview({
      title: 'Workshop context',
      text,
      path: 'tool-setup/prompt--workshop-context.md',
      intro: 'Paste this once to situate your AI tool. Add the current state, challenge and question before sending it.',
      preserveHistory
    });
    await copyText(text, 'Workshop context copied. Add your context before pasting it into your AI tool.');
    return;
  }

  const config = promptActions[action];
  if (!config) return;
  const text = codeBlocks(config.path)[config.index];
  if (!text) {
    showToast('This prompt is not available in the workshop bundle.');
    return;
  }
  openPromptPreview({
    title: config.title,
    text,
    path: config.path,
    intro: 'The prompt is already copied. Review the placeholders, add your context and paste it into the AI tool you are using.',
    preserveHistory
  });
  await copyText(text, config.message);
}

document.addEventListener('click', async event => {
  const resource = event.target.closest('[data-resource]');
  if (resource) openResource(resource.dataset.resource, dialog.open && dialog.contains(resource));
  if (event.target.closest('[data-close]')) dialog.close();
  if (event.target.closest('[data-back]')) openPreviousResource();
  if (event.target.closest('[data-copy-resource]') && activeContent) {
    await copyText(activeContent, `${activeCopyLabel} copied. Add your context before pasting it into your AI tool.`);
  }
  const codeCopy = event.target.closest('[data-copy-code]');
  if (codeCopy) {
    const text = codeCopy.parentElement.querySelector('pre code')?.textContent || '';
    if (text) await copyText(text, 'Copied. Add your context before pasting it into your AI tool.');
  }
  const copyAction = event.target.closest('[data-copy-action]')?.dataset.copyAction;
  if (copyAction) await handleCopyAction(copyAction, dialog.open && dialog.contains(event.target));
});

dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  if (toast.parentElement !== document.body) document.body.append(toast);
  activeContent = '';
  activeCopyLabel = 'Guidance';
  resourceHistory = [];
  updateBackButton();
});

const deskLink = document.querySelector('[data-desk]');
deskLink.href = location.protocol === 'file:' ? '../workshop/05-evaluate/comparison-desk.html' : 'content/workshop/05-evaluate/comparison-desk.html';

const stateLinks = [...document.querySelectorAll('.state-link')];
const firstStage = document.querySelector('.stage[id]');
const masthead = document.querySelector('.masthead');
let navigationTarget = '';
let navigationReleaseTimer = 0;
const setCurrentState = id => {
  stateLinks.forEach(link => {
    if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
};

const clearCurrentState = () => stateLinks.forEach(link => link.removeAttribute('aria-current'));
const isBeforeFirstStage = () => window.scrollY < firstStage.offsetTop - masthead.offsetHeight - 32;
const releaseNavigationLock = () => {
  navigationTarget = '';
  window.clearTimeout(navigationReleaseTimer);
  if (isBeforeFirstStage()) clearCurrentState();
};

const stateObserver = new IntersectionObserver(entries => {
  if (navigationTarget) return;
  if (isBeforeFirstStage()) { clearCurrentState(); return; }
  const active = entries.find(entry => entry.isIntersecting);
  if (active) setCurrentState(active.target.id);
}, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

document.querySelectorAll('.stage[id]').forEach(stage => stateObserver.observe(stage));
stateLinks.forEach(link => link.addEventListener('click', () => {
  navigationTarget = link.getAttribute('href').slice(1);
  setCurrentState(navigationTarget);
  window.clearTimeout(navigationReleaseTimer);
  navigationReleaseTimer = window.setTimeout(releaseNavigationLock, 1400);
}));
window.addEventListener('scrollend', releaseNavigationLock);
window.addEventListener('scroll', () => {
  if (!navigationTarget && isBeforeFirstStage()) clearCurrentState();
}, { passive: true });
if (isBeforeFirstStage()) clearCurrentState();

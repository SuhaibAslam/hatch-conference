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
    message: 'Orient prompt copied. Paste it into your AI tool and add your material.'
  },
  coordinate: {
    title: 'Coordinate thinking prompt',
    path: 'workshop/02-coordinate/prompt--thinking-partner.md',
    index: 0,
    message: 'Coordinate prompt copied. Paste it into your AI tool and add your workflow choices.'
  },
  specify: {
    title: 'Specify thinking prompt',
    path: 'workshop/03-specify/prompt--thinking-partner.md',
    index: 0,
    message: 'Specify prompt copied. Paste it into your AI tool and add the team work you want to inspect.'
  },
  draft: {
    title: 'Encode skill-drafting prompt',
    path: 'workshop/04-encode/prompt--draft-guidance.md',
    index: 0,
    message: 'Drafting prompt copied. Add your team decisions before sending it.'
  },
  baseline: {
    title: 'Evaluate baseline prompt',
    path: 'workshop/05-evaluate/prompt--run-and-review.md',
    index: 0,
    message: 'Baseline prompt copied. Add the stable case before sending it in a fresh conversation.'
  },
  guided: {
    title: 'Evaluate guided prompt',
    path: 'workshop/05-evaluate/prompt--run-and-review.md',
    index: 1,
    message: 'Guided prompt copied. Add the same stable case and the skill before sending it in a second fresh conversation.'
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
    if (line.startsWith('```')) { closeList(); closeTable(); code = !code; html += code ? '<pre><code>' : '</code></pre>'; continue; }
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
      link.href = `content/${target}`;
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

function openPromptPreview({ title, text, path = '', intro = '' }) {
  resourceHistory = [];
  resourceTitle.textContent = title;
  resourceKind.textContent = 'Ready-to-paste AI prompt';
  resourceSource.hidden = !path;
  if (path) resourceSource.href = `${repositoryUrl}/blob/main/${path}`;
  copyResourceButton.textContent = 'Copy prompt';
  activeContent = text;
  activeCopyLabel = 'Prompt';
  resourceContent.innerHTML = `${intro ? `<p class="prompt-intro">${escapeHtml(intro)}</p>` : ''}<pre><code>${escapeHtml(text)}</code></pre>`;
  updateBackButton();
  showDialog();
}

async function handleCopyAction(action) {
  if (action === 'quickstart') {
    const text = workshopContext();
    await copyText(text, 'Workshop context copied. Paste it into a new AI conversation.');
    openPromptPreview({
      title: 'Workshop context',
      text,
      path: 'tool-setup/prompt--workshop-context.md',
      intro: 'Paste this once to situate your AI tool. Add the current state, challenge and question before sending it.'
    });
    return;
  }

  const config = promptActions[action];
  if (!config) return;
  const text = codeBlocks(config.path)[config.index];
  if (!text) {
    showToast('This prompt is not available in the workshop bundle.');
    return;
  }
  await copyText(text, config.message);
  openPromptPreview({
    title: config.title,
    text,
    path: config.path,
    intro: 'The prompt is already copied. Review the placeholders, add your team material and paste it into the AI tool you are using.'
  });
}

document.addEventListener('click', async event => {
  const resource = event.target.closest('[data-resource]');
  if (resource) openResource(resource.dataset.resource);
  if (event.target.closest('[data-close]')) dialog.close();
  if (event.target.closest('[data-back]')) openPreviousResource();
  if (event.target.closest('[data-copy-resource]') && activeContent) {
    await copyText(activeContent, `${activeCopyLabel} copied. Paste it into your AI tool or shared workspace.`);
  }
  const copyAction = event.target.closest('[data-copy-action]')?.dataset.copyAction;
  if (copyAction) await handleCopyAction(copyAction);
});

dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  activeContent = '';
  activeCopyLabel = 'Guidance';
  resourceHistory = [];
  updateBackButton();
});

const deskLink = document.querySelector('[data-desk]');
deskLink.href = location.protocol === 'file:' ? '../workshop/05-evaluate/comparison-desk.html' : 'content/workshop/05-evaluate/comparison-desk.html';

const stateLinks = [...document.querySelectorAll('.state-link')];
const setCurrentState = id => {
  stateLinks.forEach(link => {
    if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
};

const stateObserver = new IntersectionObserver(entries => {
  const active = entries.find(entry => entry.isIntersecting);
  if (active) setCurrentState(active.target.id);
}, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

document.querySelectorAll('.stage[id]').forEach(stage => stateObserver.observe(stage));
stateLinks.forEach(link => link.addEventListener('click', () => setCurrentState(link.getAttribute('href').slice(1))));

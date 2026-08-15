const repositoryUrl = 'https://github.com/SuhaibAslam/hatch-conference';
const dialog = document.querySelector('#resource-dialog');
const resourceContent = document.querySelector('#resource-content');
const toast = document.querySelector('#toast');
let activeResource = '';

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
      if (!table) html += '<table><tbody>';
      table = true;
      html += `<tr>${cells.map(cell => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`;
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
  window.setTimeout(() => toast.classList.remove('show'), 2600);
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
  return `Use this workshop repository as our source:\n${repositoryUrl}\n\nWe are participants in Design Skills for the Agentic Era. We are carrying one real AI-supported workflow through five working states:\n1. Orient: find the real situation and judgment that need attention.\n2. Coordinate: decide who acts, who decides and when authority should shift.\n3. Specify: shape the shared challenge, working relationship and workflow.\n4. Encode: turn recurring method, decisions or judgment into an agent skill.\n5. Evaluate: compare the same case without and with the skill, then decide what to improve.\n\nAsk only for context you need. Keep confirmed evidence, assumptions and open questions separate. Make human authority, intervention and recovery explicit. Use only material we are authorised to share.\n\nOur current state is:\n[Orient / Coordinate / Specify / Encode / Evaluate]\n\nOur workflow or challenge is:\n[add]`;
}

function openResource(path) {
  const markdown = window.WORKSHOP_CONTENT?.[path];
  if (!markdown) { showToast('This guidance is not available in the workshop bundle.'); return; }
  activeResource = path;
  const clean = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  const title = clean.match(/^#\s+(.+)$/m)?.[1] || 'Workshop guidance';
  document.querySelector('#resource-title').textContent = title;
  document.querySelector('#resource-kind').textContent = path.includes('/SKILL.md') ? 'Design guidance' : 'Workshop material';
  document.querySelector('#resource-source').href = `${repositoryUrl}/blob/main/${path}`;
  resourceContent.innerHTML = renderMarkdown(markdown);
  resourceContent.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (/^(https?:|mailto:|#)/.test(href)) return;
    const target = new URL(href, `https://workshop.local/${path}`).pathname.slice(1);
    const bundled = window.WORKSHOP_CONTENT?.[target] ? target : `${target.replace(/\/$/, '')}/README.md`;
    if (window.WORKSHOP_CONTENT?.[bundled]) {
      link.href = '#';
      link.addEventListener('click', event => { event.preventDefault(); openResource(bundled); });
    } else link.href = `content/${target}`;
  });
  dialog.showModal();
}

document.addEventListener('click', event => {
  const resource = event.target.closest('[data-resource]');
  if (resource) openResource(resource.dataset.resource);
  if (event.target.closest('[data-close]')) dialog.close();
  if (event.target.closest('[data-copy-resource]') && activeResource) copyText(window.WORKSHOP_CONTENT[activeResource], 'Guidance copied. Paste it into your AI tool or shared workspace.');
  const copyAction = event.target.closest('[data-copy-action]')?.dataset.copyAction;
  if (copyAction === 'quickstart') copyText(workshopContext(), 'Workshop context copied. Paste it into a new AI conversation.');
  if (copyAction === 'draft') {
    const prompt = codeBlocks('workshop/04-encode/prompt--draft-guidance.md')[0];
    if (prompt) copyText(prompt, 'Drafting prompt copied. Add your team decisions before sending it.');
    else showToast('The drafting prompt is unavailable. Open the GitHub repository instead.');
  }
  if (copyAction === 'baseline' || copyAction === 'guided') {
    const prompts = codeBlocks('workshop/05-evaluate/prompt--run-and-review.md');
    const prompt = prompts[copyAction === 'baseline' ? 0 : 1];
    if (prompt) copyText(prompt, `${copyAction === 'baseline' ? 'Baseline' : 'Guided'} prompt copied. Add the stable case before sending it in a fresh conversation.`);
    else showToast('The trial prompt is unavailable. Open the Evaluate guide instead.');
  }
});

dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const deskLink = document.querySelector('[data-desk]');
deskLink.href = location.protocol === 'file:' ? '../workshop/05-evaluate/comparison-desk.html' : 'content/workshop/05-evaluate/comparison-desk.html';

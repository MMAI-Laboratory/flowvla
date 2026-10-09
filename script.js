(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const videos = [...new Set($$('.media-shell video, #overview-video'))];
  const states = new WeakMap(), membership = new WeakMap();
  const groups = [], dialog = $('#video-dialog'), expanded = $('#expanded-video'), dialogContext = $('#dialog-context');
  let opener = null, expandedSource = null;
  const duration = v => Number.isFinite(v.duration) ? v.duration : Number(v.dataset.duration) || 0;
  const format = n => Number.isFinite(n) ? `${Math.floor(Math.max(0, n) / 60)}:${String(Math.floor(Math.max(0, n) % 60)).padStart(2, '0')}` : '--:--';
  const available = v => !$('#figure-dialog')?.open && !v.closest('[hidden]') && !document.hidden && (v === expanded ? dialog?.open : !dialog?.open);
  const node = (tag, className, text) => { const n = document.createElement(tag); n.className = className; if (text) n.textContent = text; return n; };
  const iconPaths = {
    play: '<path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" stroke="none"/>',
    restart: '<path d="M3 10a9 9 0 1 1 2.6 8.4M3 4v6h6"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/>',
    loading: '<circle cx="12" cy="12" r="8" opacity=".2"/><path d="M12 4a8 8 0 0 1 8 8"/>'
  };
  const labelButton = (b, label) => { b.setAttribute('aria-label', label); b.title = label; };
  function buttonState(b, state, label) {
    labelButton(b, label);
    if (b.dataset.state === state) return;
    b.dataset.state = state;
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', `control-icon${state === 'loading' ? ' control-icon--loading' : ''}`);
    icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('width', '20'); icon.setAttribute('height', '20');
    icon.setAttribute('fill', 'none'); icon.setAttribute('stroke', 'currentColor'); icon.setAttribute('stroke-width', '1.8');
    icon.setAttribute('stroke-linecap', 'round'); icon.setAttribute('stroke-linejoin', 'round');
    icon.setAttribute('aria-hidden', 'true'); icon.setAttribute('focusable', 'false'); icon.innerHTML = iconPaths[state];
    const previous = $('.control-icon', b); if (previous) previous.replaceWith(icon); else b.prepend(icon);
  }
  const button = (cls, state, label, grouped = false) => {
    const b = node('button', `${cls} control-button media-action${grouped ? "" : " media-action--icon"}`); b.type = 'button'; buttonState(b, state, label);
    if (grouped) { const scope = node('span', 'control-scope', 'All'); scope.setAttribute('aria-hidden', 'true'); b.append(scope); }
    return b;
  };
  function toolbar(prefix, title, grouped = false) {
    const bar = node('div', `${prefix}-controls`); bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', `${title} controls`);
    if (grouped) bar.append(node('span', 'group-label', title));
    const scope = grouped ? `all videos in ${title}` : title;
    const play = button(`${prefix}-play`, 'play', `Play ${scope}`, grouped);
    const seek = node('input', `${prefix}-seek`); seek.type = 'range'; seek.min = 0; seek.max = 1000; seek.step = 1; seek.value = 0; seek.setAttribute('aria-label', `Seek ${title}`);
    const time = node('output', `${prefix}-time`, '0:00 / --:--');
    const restart = button(`${prefix}-restart`, 'restart', `${grouped ? 'Replay' : 'Restart'} ${scope} from the beginning`, grouped);
    const enlarge = grouped ? null : button('player-expand', 'expand', `Enlarge ${title}`);
    const status = node('span', `${prefix}-status`); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    let stop = null, timeline = null;
    if (grouped) {
      const actions = node('div', 'group-actions');
      stop = button('group-stop', 'stop', `Stop all videos in ${title} and return to the beginning`, true);
      $('.control-scope', stop).textContent = 'Stop';
      $('.control-scope', restart).textContent = 'Replay';
      actions.append(play, stop, restart);
      timeline = node('div', 'group-timeline'); timeline.append(seek, time);
      bar.append(actions, timeline);
    } else { bar.append(play, seek, time, restart, enlarge); }
    bar.append(status);
    return { bar, play, seek, time, restart, stop, timeline, enlarge, status };
  }
  const status = (ui, text, loading = false) => { ui.status.textContent = text; ui.status.dataset.loading = String(loading); ui.bar.setAttribute('aria-busy', String(loading)); };
  const mediaURL = v => v.currentSrc || v.getAttribute('src') || v.dataset.src || $('source', v)?.getAttribute('src') || $('source', v)?.dataset.src;
  function hydrate(v, preload = 'metadata') {
    const first = !v.dataset.hydrated;
    if (v.dataset.src && !v.getAttribute('src')) v.src = v.dataset.src;
    $$('source[data-src]', v).forEach(source => { if (!source.getAttribute('src')) source.src = source.dataset.src; });
    v.dataset.hydrated = 'true';
    // Near-view metadata warms the header, never overrides an intentional playback download.
    if (preload === 'auto' || v.preload !== 'auto') v.preload = preload;
    if (first || v.error || v.networkState === 3) v.load();
  }
  const nearViewport = v => {
    if (v === expanded || v.closest('[hidden], [inert]') || document.hidden) return false;
    const r = v.getBoundingClientRect();
    return r.bottom > -200 && r.top < innerHeight + 200;
  };
  function warm(v) { if (nearViewport(v)) hydrate(v); }
  const mediaObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) warm(entry.target); });
  }, { rootMargin: '200px 0px' }) : null;
  function updateVideo(v) {
    const s = states.get(v), d = duration(v), playing = !v.paused || s.pending;
    buttonState(s.ui.play, s.pending ? 'loading' : playing ? 'pause' : 'play', `${s.pending ? 'Cancel loading' : playing ? 'Pause' : 'Play'} ${s.title}`);
    if (!s.seeking) s.ui.seek.value = d ? Math.min(1000, v.currentTime / d * 1000) : 0;
    s.ui.time.textContent = `${format(v.currentTime)} / ${d ? format(d) : '--:--'}`;
    s.ui.seek.setAttribute('aria-valuetext', `${format(v.currentTime)} of ${d ? format(d) : 'unknown duration'}`);
    if (s.start) {
      const hidden = !v.paused || v.currentTime > 0 || s.pending;
      if (hidden && document.activeElement === s.start) s.ui.play.focus({ preventScroll: true });
      s.start.hidden = hidden;
    }
  }
  const groupDuration = g => Math.max(0, ...g.videos.map(duration));
  const groupPlaying = g => g.pending || g.videos.some(v => !v.paused);
  function updateGroup(g) {
    const d = groupDuration(g), active = g.coordinated && groupPlaying(g);
    if (g.coordinated && g.running) g.time = g.master.currentTime;
    buttonState(g.ui.play, g.pending ? 'loading' : active ? 'pause' : 'play', `${g.pending ? 'Cancel loading' : active ? 'Pause' : 'Play'} all videos in ${g.label}`);
    $('.control-scope', g.ui.play).textContent = g.pending ? 'Cancel' : active ? 'Pause all' : 'Play all';
    // Stop is the single route back to independent playback. The shared
    // timeline is only exposed while it represents every video in the group.
    g.ui.timeline.hidden = !g.coordinated;
    g.root.classList.toggle('is-coordinated', g.coordinated);
    g.ui.bar.dataset.mode = g.coordinated ? 'together' : 'individual';
    g.videos.forEach(v => {
      const ui = states.get(v).ui;
      [ui.play, ui.seek, ui.time, ui.restart].forEach(control => {
        if (g.coordinated && document.activeElement === control) g.ui.play.focus({ preventScroll: true });
        control.hidden = g.coordinated;
      });
      ui.bar.classList.toggle('is-coordinated', g.coordinated);
      ui.context.hidden = !g.coordinated;
    });
    if (!g.seeking) g.ui.seek.value = d ? Math.min(1000, g.time / d * 1000) : 0;
    g.ui.time.textContent = `${format(g.time)} / ${d ? format(d) : '--:--'}`;
    g.ui.seek.setAttribute('aria-valuetext', `${format(g.time)} of ${d ? format(d) : 'unknown duration'}`);
  }
  function pauseOne(v) { const s = states.get(v); s.token++; s.pending = false; v.pause(); status(s.ui, ''); updateVideo(v); }
  function pauseGroup(g) {
    if (g.running) g.time = g.master.currentTime;
    g.token++; g.pending = false; g.running = false; g.videos.forEach(pauseOne); status(g.ui, ''); updateGroup(g);
  }
  function individualMode(g, focus = false) {
    pauseGroup(g); g.coordinated = false; updateGroup(g);
    if (focus) states.get(g.videos[0]).ui.play.focus({ preventScroll: true });
  }
  function stopGroup(g) {
    pauseGroup(g); g.time = 0; g.seeking = false; g.coordinated = false;
    // Stopping an unplayed group must not start metadata or media downloads.
    g.videos.forEach(v => {
      const s = states.get(v); s.seeking = false;
      if (v.readyState >= 1 || v.currentTime > 0) v.currentTime = 0;
      updateVideo(v);
    });
    updateGroup(g);
  }
  function independent(v) { const g = membership.get(v); if (g?.coordinated || g?.pending) individualMode(g); }
  function ready(v, level = 3) {
    if (v.readyState >= level && (level === 1 || !v.seeking)) return Promise.resolve();
    hydrate(v, level === 1 ? 'metadata' : 'auto');
    return new Promise((resolve, reject) => {
      const event = level === 1 ? 'loadedmetadata' : 'canplay', sources = $$('source', v); let timer;
      const done = error => { clearTimeout(timer); v.removeEventListener(event, ok); v.removeEventListener('seeked', ok); v.removeEventListener('error', fail); sources.forEach(source => source.removeEventListener('error', fail)); error ? reject(error) : resolve(); };
      const ok = () => { if (v.readyState >= level && (level === 1 || !v.seeking)) done(); }, fail = () => done(new Error('Video unavailable'));
      v.addEventListener(event, ok); v.addEventListener('seeked', ok); v.addEventListener('error', fail); sources.forEach(source => source.addEventListener('error', fail));
      timer = setTimeout(() => done(new Error('Video loading timed out')), 30000);
      ok();
    });
  }
  async function playOne(v, restart = false) {
    independent(v); const s = states.get(v); if (!available(v)) return;
    const token = ++s.token; s.pending = true; status(s.ui, 'Loading video…', true); updateVideo(v);
    try {
      hydrate(v, 'auto');
      if (restart || v.ended || (duration(v) && v.currentTime >= duration(v) - 0.03)) v.currentTime = 0;
      // Call play in the original gesture so narrated overview audio works on mobile too.
      await v.play();
      if (token !== s.token) return;
      if (!available(v)) { v.pause(); return; }
      status(s.ui, '');
    } catch (_) { if (token === s.token) status(s.ui, 'Unable to play. Press Play to retry.'); }
    finally { if (token === s.token) { s.pending = false; updateVideo(v); } }
  }
  async function seekOne(v, ratio) {
    independent(v); pauseOne(v); const s = states.get(v), token = s.token; status(s.ui, 'Loading video…', true);
    try { await ready(v, 1); if (token !== s.token) return false; v.currentTime = ratio * duration(v); status(s.ui, ''); updateVideo(v); return true; }
    catch (_) { if (token === s.token) status(s.ui, 'Unable to seek. Try again.'); return false; }
  }
  async function playGroup(g, restart = false) {
    const wasCoordinated = g.coordinated;
    pauseGroup(g); const token = g.token;
    g.coordinated = true; g.pending = true; status(g.ui, 'Loading videos…', true); updateGroup(g);
    try {
      g.videos.forEach(v => hydrate(v, 'auto'));
      await Promise.all(g.videos.map(v => ready(v, 1)));
      if (token !== g.token || !g.videos.every(available)) return;
      const d = groupDuration(g); g.master = g.videos.reduce((a, b) => duration(a) >= duration(b) ? a : b);
      if (restart || !wasCoordinated || g.time >= d - 0.03) g.time = 0;
      g.videos.forEach(v => { const target = Math.min(g.time, duration(v)); if (Math.abs(v.currentTime - target) > 0.02) v.currentTime = target; });
      const active = g.videos.filter(v => g.time < duration(v) - 0.03);
      await Promise.all(active.map(v => ready(v)));
      if (token !== g.token || !g.videos.every(available)) return;
      await Promise.all(active.map(v => v.play()));
      if (token !== g.token) return;
      if (!g.videos.every(available)) { active.forEach(v => v.pause()); return; }
      g.running = true; status(g.ui, '');
    } catch (_) {
      if (token === g.token) { g.videos.forEach(v => v.pause()); status(g.ui, 'Could not load every video. Retry Play all, or press Stop to play videos separately.'); }
    } finally { if (token === g.token) { g.pending = false; updateGroup(g); } }
  }
  async function seekGroup(g, ratio) {
    pauseGroup(g); const token = g.token; status(g.ui, 'Loading videos…', true);
    try {
      await Promise.all(g.videos.map(v => ready(v, 1))); if (token !== g.token) return false;
      g.time = ratio * groupDuration(g); g.coordinated = true;
      g.videos.forEach(v => { v.currentTime = Math.min(g.time, duration(v)); });
      status(g.ui, ''); updateGroup(g); return true;
    } catch (_) { if (token === g.token) status(g.ui, 'Unable to seek. Try again.'); return false; }
  }
  function wireSeek(ui, state, seek, playing, resume) {
    let resumeAfter = false, task = Promise.resolve(false);
    ui.seek.addEventListener('input', () => { if (!state.seeking) resumeAfter = playing(); state.seeking = true; task = seek(Number(ui.seek.value) / 1000); });
    ui.seek.addEventListener('change', async () => { const current = task, resumeRequested = resumeAfter; const ok = await current; if (current !== task) return; state.seeking = false; if (ok && resumeRequested && Number(ui.seek.value) < 1000) resume(); });
  }
  videos.forEach(v => {
    const shell = v.closest('.media-shell') || v.parentElement, title = shell.dataset.title || v.getAttribute('aria-label') || 'video';
    const ui = toolbar('player', title), s = { ui, title, start: $('.overview-start', shell), token: 0, pending: false, seeking: false };
    states.set(v, s); v.controls = false; v.autoplay = false; v.removeAttribute('autoplay'); v.loop = false; v.playsInline = true;
    ui.context = node('span', 'player-group-context', 'Together'); ui.context.hidden = true;
    ui.bar.prepend(ui.context); shell.append(ui.bar);
    if (v !== expanded) mediaObserver?.observe(v);
    ui.bar.addEventListener('pointerenter', () => warm(v), { passive: true });
    ui.bar.addEventListener('focusin', () => warm(v));
    const togglePlayback = () => { if (!v.paused || s.pending) { independent(v); pauseOne(v); } else playOne(v); };
    ui.play.addEventListener('click', togglePlayback);
    s.start?.addEventListener('click', togglePlayback);
    ui.restart.addEventListener('click', () => playOne(v, true));
    wireSeek(ui, s, ratio => seekOne(v, ratio), () => !v.paused || s.pending, () => playOne(v));
    ['loadedmetadata', 'durationchange', 'timeupdate', 'play', 'pause', 'ended', 'seeked'].forEach(event => v.addEventListener(event, () => { updateVideo(v); const g = membership.get(v); if (g) updateGroup(g); }));
    v.addEventListener('waiting', () => { const g = membership.get(v); if (!v.paused) status(g?.coordinated ? g.ui : ui, 'Buffering…', true); });
    v.addEventListener('playing', () => { const g = membership.get(v); status(g?.coordinated ? g.ui : ui, ''); });
    v.addEventListener('error', () => {
      const g = membership.get(v);
      if (g?.coordinated) { if (!g.pending) { pauseGroup(g); status(g.ui, 'A video could not load. Retry Play all, or press Stop to play videos separately.'); } return; }
      if (!s.pending && v.dataset.hydrated) status(ui, 'Unable to load video. Press Play to retry.');
    });
    ui.enlarge.hidden = v === expanded || !dialog || !expanded;
    ui.enlarge.addEventListener('click', () => {
      if (!dialog || !expanded) return;
      opener = ui.enlarge; expandedSource = v; groups.forEach(pauseGroup); videos.forEach(pauseOne);
      $('#dialog-title').textContent = title; expanded.muted = v.muted; expanded.volume = v.volume; expanded.loop = false;
      if (dialogContext) {
        const clip = v.closest('.clip'), panel = v.closest('.gallery-panel'), gallery = v.closest('.media-gallery');
        const instruction = panel ? $('.instruction', panel) : gallery ? $('.instruction', gallery) : null;
        const details = [clip && $('.clip-description', clip)?.textContent, instruction?.textContent, clip && $('.speed', clip)?.textContent]
          .map(text => (text || '').trim()).filter((text, index, parts) => text && text !== title && parts.indexOf(text) === index);
        dialogContext.textContent = v.dataset.context?.trim() || details.join(' · ');
        dialogContext.hidden = !dialogContext.textContent;
      }
      const position = v.currentTime;
      const viewport = v.closest('.video-viewport'), expandedViewport = expanded.closest('.video-viewport');
      const rect = viewport?.getBoundingClientRect(), ratio = rect?.height ? rect.width / rect.height : 4/3;
      expandedViewport.setAttribute('style', viewport?.getAttribute('style') || '');
      expandedViewport.style.setProperty('--video-ratio', ratio);
      expandedViewport.toggleAttribute('data-panel-view', viewport?.hasAttribute('data-panel-view') || false);
      expanded.closest('.media-shell').style.setProperty('--expanded-ratio', ratio);
      const expandedState = states.get(expanded);
      expandedState.title = title; expanded.dataset.duration = duration(v); expanded.poster = v.poster;
      expanded.controls = false; expanded.setAttribute('aria-label', title);
      expandedState.ui.bar.setAttribute('aria-label', `${title} controls`);
      expandedState.ui.seek.setAttribute('aria-label', `Seek enlarged ${title}`);
      labelButton(expandedState.ui.restart, `Restart enlarged ${title} from the beginning`);
      updateVideo(expanded);
      expanded.onloadedmetadata = () => { expanded.currentTime = Math.min(position, expanded.duration); };
      expanded.src = mediaURL(v); expanded.preload = 'metadata'; expanded.load(); dialog.showModal();
    });
    updateVideo(v);
  });
  $$('.media-group').forEach(root => {
    const members = $$('video', root).filter(v => states.has(v)); if (!members.length) return;
    const label = root.dataset.groupLabel || 'Videos', ui = toolbar('group', label, true);
    const g = { root, videos: members, ui, label, token: 0, time: 0, pending: false, running: false, coordinated: false, seeking: false, master: members[0], sync: members.every(v => v.dataset.sync === 'aggregation') };
    groups.push(g); members.forEach(v => membership.set(v, g)); root.append(ui.bar);
    ui.stop.addEventListener('click', () => stopGroup(g));
    ui.play.addEventListener('click', () => g.coordinated && groupPlaying(g) ? pauseGroup(g) : playGroup(g)); ui.restart.addEventListener('click', () => playGroup(g, true));
    wireSeek(ui, g, ratio => seekGroup(g, ratio), () => groupPlaying(g), () => playGroup(g)); updateGroup(g);
  });
  $$('.media-gallery[data-gallery]').forEach(gallery => {
    const choices = $$('[data-choice]', gallery), panels = $$('[data-panel]', gallery);
    const select = choice => {
      choices.forEach(b => { const selected = b === choice; b.setAttribute('aria-pressed', String(selected)); b.classList.toggle('is-active', selected); });
      panels.forEach(p => { p.hidden = p.dataset.panel !== choice.dataset.choice; p.inert = p.hidden; p.toggleAttribute('inert', p.hidden); p.setAttribute('aria-hidden', String(p.hidden)); if (p.hidden) { groups.filter(g => p.contains(g.videos[0])).forEach(pauseGroup); $$('video', p).filter(v => states.has(v)).forEach(pauseOne); } else $$('video', p).forEach(warm); });
    };
    const alignHeadings = () => {
      const headings = panels.map(p => $('.task-heading', p)).filter(Boolean);
      gallery.style.removeProperty('--task-heading-height');
      if (headings.length) gallery.style.setProperty('--task-heading-height', `${Math.ceil(Math.max(...headings.map(h => h.getBoundingClientRect().height)))}px`);
    };
    let measuredWidth = 0;
    const resize = new ResizeObserver(() => {
      const width = gallery.clientWidth;
      if (width === measuredWidth) return;
      measuredWidth = width; alignHeadings();
    });
    resize.observe(gallery);
    alignHeadings();
    choices.forEach(b => b.addEventListener('click', () => select(b))); if (choices.length) select(choices.find(b => b.getAttribute('aria-pressed') === 'true') || choices[0]);
  });
  if (!mediaObserver) videos.forEach(warm);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) videos.forEach(warm); });
  let lastSync = 0;
  const tick = time => {
    if (time - lastSync > 200) {
      lastSync = time; groups.filter(g => g.running).forEach(g => {
        if (g.videos.every(v => v.paused || v.ended)) { g.running = false; updateGroup(g); return; }
        if (g.sync && !g.master.paused) g.videos.filter(v => v !== g.master && !v.paused && !v.seeking).forEach(v => { if (Math.abs(v.currentTime - g.master.currentTime) > 0.1) v.currentTime = g.master.currentTime; });
        updateGroup(g);
      });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { groups.forEach(pauseGroup); videos.forEach(pauseOne); expanded?.pause(); } });
  $('#close-dialog')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog?.addEventListener('close', () => {
    if (expandedSource && expanded.readyState >= 1 && Number.isFinite(expanded.currentTime)) {
      const position = Math.min(expanded.currentTime, duration(expandedSource)), source = expandedSource, g = membership.get(source);
      if (g?.coordinated) seekGroup(g, groupDuration(g) ? position / groupDuration(g) : 0);
      else { hydrate(source); ready(source, 1).then(() => { source.currentTime = position; updateVideo(source); }).catch(() => {}); }
    }
    expanded.pause(); expanded.onloadedmetadata = null; expanded.removeAttribute('src'); expanded.load(); opener?.focus({ preventScroll: true }); expandedSource = null;
    if (dialogContext) { dialogContext.textContent = ''; dialogContext.hidden = true; }
  });
  $$('.table-block > .table-scroll:not(.performance-scroll)').forEach((scroll, index) => {
    const hint = node('p', 'table-scroll-hint', 'Scroll to view all columns ↔');
    hint.id = `table-scroll-hint-${index + 1}`; hint.hidden = true; scroll.before(hint);
    const updateScroll = () => {
      const overflow = scroll.scrollWidth > scroll.clientWidth + 1;
      hint.hidden = !overflow;
      scroll.classList.toggle('has-overflow', overflow);
      scroll.classList.toggle('can-scroll-left', overflow && scroll.scrollLeft > 1);
      scroll.classList.toggle('can-scroll-right', overflow && scroll.scrollLeft + scroll.clientWidth < scroll.scrollWidth - 1);
      const descriptions = (scroll.getAttribute('aria-describedby') || '').split(/\s+/).filter(id => id && id !== hint.id);
      if (overflow) descriptions.push(hint.id);
      if (descriptions.length) scroll.setAttribute('aria-describedby', descriptions.join(' '));
      else scroll.removeAttribute('aria-describedby');
    };
    const resize = new ResizeObserver(updateScroll); resize.observe(scroll);
    if (scroll.firstElementChild) resize.observe(scroll.firstElementChild);
    scroll.addEventListener('scroll', updateScroll, { passive: true }); updateScroll();
  });
  $('#copy-citation')?.addEventListener('click', async () => {
    const text = $('#bibtex').textContent.trim(), status = $('#copy-status');
    try { await navigator.clipboard.writeText(text); status.textContent = 'Citation copied.'; }
    catch (_) { const selection = getSelection(), range = document.createRange(); range.selectNodeContents($('#bibtex')); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Select and copy the citation below.'; }
  });
  const navToggle = $('.nav-toggle'), nav = $('.main-nav');
  function revealNavLink(container, link) {
    if (!container || !link || !container.clientHeight || !link.getClientRects().length) return;
    const bounds = container.getBoundingClientRect(), item = link.getBoundingClientRect();
    const top = bounds.top + container.clientTop, bottom = top + container.clientHeight;
    const inset = Math.min(8, container.clientHeight / 4);
    if (item.top < top + inset) container.scrollTop += item.top - top - inset;
    else if (item.bottom > bottom - inset) container.scrollTop += item.bottom - bottom + inset;
  }
  const queueNavReveal = (container, link) => requestAnimationFrame(() => {
    if (link?.getAttribute('aria-current') === 'location') revealNavLink(container, link);
  });
  const closeNav = () => { nav?.classList.remove('is-open'); navToggle?.setAttribute('aria-expanded', 'false'); };
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(open));
    if (open) queueNavReveal(nav, $('a[aria-current="location"]', nav));
  });
  $$('.main-nav a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('is-open')) { closeNav(); navToggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeNav(); });
  const figureDialog = $('#figure-dialog'), figureViewer = $('.figure-viewer'), figureImage = $('#expanded-figure'), figureZoom = $('#figure-zoom');
  let figureOpener;
  $$('[data-figure-title]').forEach(link => link.addEventListener('click', e => {
    if (!figureDialog || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); figureOpener = link; groups.forEach(pauseGroup); videos.forEach(pauseOne);
    $('#figure-dialog-title').textContent = link.dataset.figureTitle;
    $('#figure-dialog-caption').textContent = link.dataset.figureCaption;
    figureImage.src = link.href; figureImage.alt = link.dataset.figureTitle;
    figureViewer.classList.remove('is-original'); figureZoom.setAttribute('aria-pressed', 'false'); figureZoom.textContent = 'Original size';
    figureDialog.showModal(); figureViewer.scrollLeft = 0; figureViewer.scrollTop = 0;
  }));
  figureZoom?.addEventListener('click', () => { const original = figureViewer.classList.toggle('is-original'); figureZoom.setAttribute('aria-pressed', String(original)); figureZoom.textContent = original ? 'Fit to screen' : 'Original size'; });
  $('#close-figure')?.addEventListener('click', () => figureDialog.close());
  figureDialog?.addEventListener('click', e => { if (e.target === figureDialog) { const r = figureDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) figureDialog.close(); } });
  figureDialog?.addEventListener('close', () => figureOpener?.focus({ preventScroll: true }));
  const targetForHash = hash => {
    if (!hash || hash.length < 2) return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch (_) { return null; }
  };
  const navRecords = root => root ? $$('a[href^="#"]', root).map(link => ({ link, target: targetForHash(link.hash) })).filter(record => record.target) : [];
  const outlineRail = $('.page-outline'), outlineNav = $('.page-outline .outline-nav'), headerRecords = navRecords(nav), outlineRecords = navRecords(outlineNav);
  const isMainLink = record => !record.link.closest('.outline-sublist');
  const sectionRecords = [...outlineRecords.filter(isMainLink), ...headerRecords.filter(isMainLink)]
    .filter((record, index, records) => records.findIndex(other => other.target === record.target) === index)
    .sort((a, b) => a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  const targetRecords = [...outlineRecords, ...headerRecords]
    .filter((record, index, records) => records.findIndex(other => other.target === record.target) === index)
    .filter(record => record.target.hasAttribute('data-outline-target') || sectionRecords.some(section => section.target === record.target));
  const outlineItems = $$('.main-nav .outline-item[data-section], .page-outline .outline-item[data-section]');
  const navLocation = $('.nav-toggle .nav-location'), backToTop = $('.back-to-top');
  const visibleTarget = target => {
    if (target.closest('[hidden], [inert], [aria-hidden="true"]') || !target.getClientRects().length) return false;
    return getComputedStyle(target).visibility !== 'hidden';
  };
  const markCurrent = (records, current) => records.forEach(record => {
    if (record === current) record.link.setAttribute('aria-current', 'location');
    else record.link.removeAttribute('aria-current');
  });
  const focusHash = () => {
    const target = targetForHash(location.hash);
    if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  };
  let navQueued = false, previousHeaderLink = null, previousOutlineLink = null;
  const updateNav = () => {
    navQueued = false;
    const headerBottom = $('.site-header')?.getBoundingClientRect().bottom || 0;
    const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const readingLine = Math.min(innerHeight - 1, Math.max(80, headerBottom + 40, scrollPadding + 24));
    const sections = sectionRecords.filter(record => visibleTarget(record.target))
      .map(record => ({ ...record, rect: record.target.getBoundingClientRect() }));
    const atEnd = scrollY > 0 && Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2;
    const inHero = sections.length && sections[0].rect.top > readingLine;
    let currentSection = sections[0];
    for (const section of sections) if (section.rect.top <= readingLine) currentSection = section;
    if (atEnd && sections.length) currentSection = sections[sections.length - 1];
    let currentTarget = currentSection?.target;
    if (currentSection && !inHero && !atEnd) {
      const candidates = targetRecords.filter(record => record.target !== currentSection.target && currentSection.target.contains(record.target) && visibleTarget(record.target))
        .map(record => ({ ...record, rect: record.target.getBoundingClientRect() }))
        .filter(record => record.rect.top <= readingLine)
        .sort((a, b) => a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      const containing = candidates.filter(record => record.rect.bottom > readingLine);
      currentTarget = (containing[containing.length - 1] || candidates[candidates.length - 1])?.target || currentTarget;
    }
    const sectionId = currentSection?.target.id;
    const currentHeaderSection = headerRecords.find(record => isMainLink(record) && record.target === currentSection?.target);
    const currentHeader = headerRecords.find(record => record.target === currentTarget) || currentHeaderSection;
    const currentOutline = outlineRecords.find(record => record.target === currentTarget)
      || outlineRecords.find(record => record.target === currentSection?.target);
    markCurrent(headerRecords, currentHeader); markCurrent(outlineRecords, currentOutline);
    outlineItems.forEach(item => item.classList.toggle('is-current-section', item.dataset.section === sectionId));
    if (currentOutline?.link !== previousOutlineLink) {
      previousOutlineLink = currentOutline?.link; queueNavReveal(outlineRail, previousOutlineLink);
    }
    if (currentHeader?.link !== previousHeaderLink) {
      previousHeaderLink = currentHeader?.link;
      if (nav?.classList.contains('is-open')) queueNavReveal(nav, previousHeaderLink);
    }
    const locationLink = inHero || !currentSection ? headerRecords.find(isMainLink)?.link : currentHeader?.link;
    if (navLocation) navLocation.textContent = (locationLink?.dataset.location || locationLink?.textContent || '').trim();
    if (backToTop) {
      const visible = scrollY >= 500;
      backToTop.classList.toggle('is-visible', visible); backToTop.hidden = !visible; backToTop.inert = !visible;
      backToTop.toggleAttribute('inert', !visible); backToTop.setAttribute('aria-hidden', String(!visible));
    }
  };
  const queueNav = () => { if (!navQueued) { navQueued = true; requestAnimationFrame(updateNav); } };
  const followHash = () => { focusHash(); queueNav(); };
  window.addEventListener('scroll', queueNav, { passive: true });
  window.addEventListener('resize', () => { if (matchMedia('(min-width: 900px)').matches) closeNav(); queueNav(); });
  window.addEventListener('load', queueNav);
  window.addEventListener('hashchange', followHash);
  window.addEventListener('popstate', followHash);
  window.addEventListener('pageshow', queueNav);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setTimeout(followHash, 0);
  }));
  new ResizeObserver(queueNav).observe($('main') || document.body);
  updateNav(); if (location.hash) requestAnimationFrame(followHash); document.documentElement.classList.add('js');
})();

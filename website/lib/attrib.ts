// First-touch source for this visit (referrer host + landing page), kept for the session only. No personal data.
export function firstTouch(): string {
  try {
    let v = sessionStorage.getItem('ap_src');
    if (!v) {
      let r = '';
      try { r = document.referrer ? new URL(document.referrer).host : ''; } catch { r = ''; }
      if (r === location.host) r = '';
      v = JSON.stringify({ r: r.slice(0, 80), l: (location.pathname + location.search).slice(0, 120) });
      sessionStorage.setItem('ap_src', v);
    }
    return v;
  } catch {
    return '';
  }
}

(() => {
  "use strict";

  const MEASUREMENT_ID = "G-PNLM56NP8F";
  const CONSENT_KEY = "introvertebrates_analytics_consent_v1";
  const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
  const GA_DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

  // Keep Google Analytics off the child-focused Kryp & Krabater section.
  if (/^\/kryp(?:-|\/|$)/i.test(window.location.pathname)) return;
  if (window.__introvertebratesAnalyticsInitialized) return;
  window.__introvertebratesAnalyticsInitialized = true;

  const readConsent = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      if (!parsed || !["granted", "denied"].includes(parsed.choice)) return null;
      if (!parsed.savedAt || Date.now() - parsed.savedAt > CONSENT_MAX_AGE_MS) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return parsed.choice;
    } catch {
      return null;
    }
  };

  const saveConsent = (choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, savedAt: Date.now() }));
    } catch {
      // Consent still works for the current page if storage is unavailable.
    }
  };

  const clearGoogleAnalyticsCookies = () => {
    const names = document.cookie
      .split(";")
      .map((part) => part.trim().split("=")[0])
      .filter((name) => name === "_ga" || name.startsWith("_ga_"));

    names.forEach((name) => {
      const expiry = "Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `${name}=; expires=${expiry}; path=/; SameSite=Lax`;
      document.cookie = `${name}=; expires=${expiry}; path=/; domain=.introvertebrates.com; SameSite=Lax`;
    });
  };

  const startAnalytics = () => {
    window[GA_DISABLE_KEY] = false;
    if (window.__introvertebratesGa4Loaded) return;
    window.__introvertebratesGa4Loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  };

  const stopAnalytics = () => {
    window[GA_DISABLE_KEY] = true;
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
    clearGoogleAnalyticsCookies();
  };

  const injectStyles = () => {
    if (document.getElementById("introvertebrates-analytics-styles")) return;
    const style = document.createElement("style");
    style.id = "introvertebrates-analytics-styles";
    style.textContent = `
      .iv-analytics-panel {
        position: fixed; z-index: 2147483000; right: 18px; bottom: 18px;
        width: min(430px, calc(100vw - 36px)); padding: 18px;
        border: 1px solid rgba(139,196,214,.24); border-radius: 16px;
        background: rgba(4,10,18,.97); color: #d8e8ef;
        box-shadow: 0 18px 50px rgba(0,0,0,.48);
        font: 14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }
      .iv-analytics-panel h2 { margin: 0 0 8px; color: #f5f7fb; font-size: 1rem; }
      .iv-analytics-panel p { margin: 0 0 14px; color: #a8bec9; }
      .iv-analytics-panel a { color: #14f1c4; }
      .iv-analytics-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      .iv-analytics-button {
        min-height: 42px; padding: 9px 14px; border: 1px solid rgba(20,241,196,.28);
        border-radius: 999px; background: rgba(20,241,196,.09); color: #f5f7fb;
        font: inherit; font-weight: 650; cursor: pointer;
      }
      .iv-analytics-button:hover, .iv-analytics-button:focus-visible {
        border-color: rgba(20,241,196,.62); background: rgba(20,241,196,.16); outline: none;
      }
      .iv-analytics-button--secondary { border-color: rgba(139,196,214,.2); background: transparent; color: #b8cbd4; }
      .iv-privacy-button {
        min-height: 44px; display: inline-flex; align-items: center; padding: 0;
        border: 0; background: transparent; color: #7593a2;
        font: inherit; cursor: pointer;
      }
      .iv-privacy-button:hover, .iv-privacy-button:focus-visible {
        color: #14f1c4; outline: none; text-decoration: none;
      }
      .iv-privacy-button--fallback {
        position: fixed; z-index: 2147482999; right: 12px; bottom: 12px;
        min-height: 36px; padding: 7px 11px; border: 1px solid rgba(139,196,214,.16);
        border-radius: 999px; background: rgba(4,10,18,.9);
        font: 12px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        backdrop-filter: blur(8px);
      }
      @media (max-width: 520px) {
        .iv-analytics-panel { right: 10px; bottom: 10px; width: calc(100vw - 20px); padding: 16px; }
      }
    `;
    document.head.appendChild(style);
  };

  const closePanel = () => document.getElementById("introvertebrates-analytics-panel")?.remove();

  const showPanel = (isSettings = false) => {
    injectStyles();
    closePanel();

    const panel = document.createElement("section");
    panel.id = "introvertebrates-analytics-panel";
    panel.className = "iv-analytics-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "iv-analytics-title");

    const current = readConsent();
    panel.innerHTML = `
      <h2 id="iv-analytics-title">${isSettings ? "Analytics settings" : "Optional analytics"}</h2>
      <p>Introvertebrates uses Google Analytics to understand which pages people find and how the site is used. Google Analytics stays off unless you allow it. Advertising signals and ad personalisation are disabled. <a href="/privacy.html">Privacy details</a>.</p>
      ${isSettings && current ? `<p>Your current choice: <strong>${current === "granted" ? "analytics allowed" : "analytics off"}</strong>.</p>` : ""}
      <div class="iv-analytics-actions">
        <button type="button" class="iv-analytics-button" data-analytics-choice="granted">Allow analytics</button>
        <button type="button" class="iv-analytics-button iv-analytics-button--secondary" data-analytics-choice="denied">No thanks</button>
        ${isSettings ? '<button type="button" class="iv-analytics-button iv-analytics-button--secondary" data-analytics-close>Close</button>' : ""}
      </div>
    `;

    panel.addEventListener("click", (event) => {
      const choiceButton = event.target.closest("[data-analytics-choice]");
      if (choiceButton) {
        const choice = choiceButton.dataset.analyticsChoice;
        saveConsent(choice);
        if (choice === "granted") startAnalytics();
        else stopAnalytics();
        closePanel();
        return;
      }
      if (event.target.closest("[data-analytics-close]")) closePanel();
    });

    document.body.appendChild(panel);
    panel.querySelector("button")?.focus({ preventScroll: true });
  };

  const addSettingsButton = () => {
    injectStyles();
    if (document.getElementById("introvertebrates-privacy-button")) return;
    const button = document.createElement("button");
    button.id = "introvertebrates-privacy-button";
    button.className = "iv-privacy-button";
    button.type = "button";
    button.textContent = "Analytics settings";
    button.setAttribute("aria-label", "Open analytics privacy settings");
    button.addEventListener("click", () => showPanel(true));

    const footerLinks = document.querySelector(".footer-links, .research-footer-links");
    if (footerLinks) footerLinks.appendChild(button);
    else {
      button.classList.add("iv-privacy-button--fallback");
      document.body.appendChild(button);
    }
  };

  const init = () => {
    addSettingsButton();
    const consent = readConsent();
    if (consent === "granted") startAnalytics();
    else if (consent === "denied") stopAnalytics();
    else showPanel(false);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

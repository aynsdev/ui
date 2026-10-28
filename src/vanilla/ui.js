/*
 * ui.js — tiny, dependency-free behaviour for the design system.
 * Works as a plain <script> (exposes window.UI) or as a side-effect import in a bundler.
 *
 * Auto-wires, via event delegation (so it works with dynamically rendered markup):
 *   - [role="radiogroup"].ui-segmented   arrow keys, Home/End, click selection
 *   - [role="tablist"].ui-tabs           arrow keys, panel switching via aria-controls
 *   - [aria-haspopup="menu"]             open/close, Escape, outside click, arrow keys
 *   - [data-dialog-open="id"]            opens <dialog id="id">; [data-dialog-close] closes
 *   - [data-theme-choice="system|light|dark"]  theme switching
 *
 * Programmatic:
 *   UI.theme.set("dark" | "light" | "system")    UI.theme.get()
 *   UI.toast({ title, body, tone: "success" | "warning" | "danger", duration })
 *
 * Framework apps (React, Vue…) usually manage this state themselves — use only the parts you need.
 */
(function () {
  "use strict";

  var THEME_KEY = "ui-theme";
  var root = document.documentElement;

  /* Theme */
  var theme = {
    get: function () {
      try { return localStorage.getItem(THEME_KEY) || "system"; } catch (e) { return "system"; }
    },
    set: function (choice) {
      if (choice === "light" || choice === "dark") root.setAttribute("data-theme", choice);
      else root.removeAttribute("data-theme");
      try { localStorage.setItem(THEME_KEY, choice); } catch (e) { /* storage unavailable */ }
      syncThemeControls(choice);
      root.dispatchEvent(new CustomEvent("ui:themechange", { detail: { theme: choice } }));
    },
    resolved: function () {
      var attr = root.getAttribute("data-theme");
      if (attr) return attr;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
  };

  function syncThemeControls(choice) {
    document.querySelectorAll("[data-theme-choice]").forEach(function (el) {
      var on = el.getAttribute("data-theme-choice") === choice;
      if (el.getAttribute("role") === "radio") {
        el.setAttribute("aria-checked", String(on));
        el.tabIndex = on ? 0 : -1;
      } else if (el.getAttribute("role") === "menuitemradio") {
        el.setAttribute("aria-checked", String(on));
      } else {
        el.setAttribute("aria-pressed", String(on));
      }
    });
  }

  // Apply the stored theme immediately to avoid a flash.
  (function () {
    var stored = theme.get();
    if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);
  })();

  /* Roving focus helper for radiogroups, tablists and menus */
  function items(container, selector) {
    return Array.prototype.filter.call(container.querySelectorAll(selector), function (el) {
      return !el.disabled && el.getAttribute("aria-disabled") !== "true" && el.offsetParent !== null;
    });
  }

  function nextIndex(key, index, length, vertical) {
    var prev = vertical ? "ArrowUp" : "ArrowLeft";
    var next = vertical ? "ArrowDown" : "ArrowRight";
    if (key === next || (!vertical && key === "ArrowDown")) return (index + 1) % length;
    if (key === prev || (!vertical && key === "ArrowUp")) return (index - 1 + length) % length;
    if (key === "Home") return 0;
    if (key === "End") return length - 1;
    return -1;
  }

  /* Segmented control (radiogroup) */
  function selectRadio(radio) {
    var group = radio.closest('[role="radiogroup"]');
    items(group, '[role="radio"]').forEach(function (r) {
      var on = r === radio;
      r.setAttribute("aria-checked", String(on));
      r.tabIndex = on ? 0 : -1;
    });
    if (radio.hasAttribute("data-theme-choice")) theme.set(radio.getAttribute("data-theme-choice"));
    group.dispatchEvent(new CustomEvent("ui:change", { bubbles: true, detail: { value: radio.value || radio.textContent.trim() } }));
  }

  /* Tabs */
  function selectTab(tab, focus) {
    var list = tab.closest('[role="tablist"]');
    items(list, '[role="tab"]').forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = t.getAttribute("aria-controls") && document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }

  /* Menus */
  var openMenu = null;

  function menuFor(trigger) {
    return document.getElementById(trigger.getAttribute("aria-controls"));
  }

  function showMenu(trigger, focusLast) {
    if (openMenu) hideMenu(false);
    var menu = menuFor(trigger);
    if (!menu) return;
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    openMenu = { trigger: trigger, menu: menu };
    var list = items(menu, '[role^="menuitem"]');
    if (list.length) list[focusLast ? list.length - 1 : 0].focus();
  }

  function hideMenu(returnFocus) {
    if (!openMenu) return;
    openMenu.menu.hidden = true;
    openMenu.trigger.setAttribute("aria-expanded", "false");
    if (returnFocus) openMenu.trigger.focus();
    openMenu = null;
  }

  /* Toasts */
  var toastIcons = {
    success: '<path d="M20 6 9 17l-5-5"/>',
    warning: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    danger: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function toast(opts) {
    opts = typeof opts === "string" ? { title: opts } : opts || {};
    var region = document.querySelector(".ui-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "ui-toast-region";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    var el = document.createElement("div");
    el.className = "ui-toast" + (opts.tone ? " ui-toast--" + opts.tone : "");
    var icon = toastIcons[opts.tone]
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + toastIcons[opts.tone] + "</svg>"
      : "";
    el.innerHTML =
      icon +
      '<div class="ui-toast__content">' +
      (opts.title ? '<div class="ui-toast__title">' + escapeHtml(opts.title) + "</div>" : "") +
      (opts.body ? '<div class="ui-toast__body">' + escapeHtml(opts.body) + "</div>" : "") +
      "</div>" +
      '<button class="ui-icon-button ui-icon-button--xs" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';

    function dismiss() {
      if (el.hasAttribute("data-leaving")) return;
      el.setAttribute("data-leaving", "");
      setTimeout(function () { el.remove(); }, 200);
    }
    el.querySelector("button").addEventListener("click", dismiss);
    region.appendChild(el);
    if (opts.duration !== 0) setTimeout(dismiss, opts.duration || 4000);
    return { dismiss: dismiss };
  }

  /* Event delegation */
  document.addEventListener("click", function (e) {
    var t = e.target;

    var radio = t.closest('[role="radiogroup"] [role="radio"]');
    if (radio && !radio.disabled) { selectRadio(radio); return; }

    var tab = t.closest('[role="tablist"] [role="tab"]');
    if (tab && tab.tagName === "BUTTON") { selectTab(tab, false); return; }

    var themeBtn = t.closest("[data-theme-choice]");
    if (themeBtn) theme.set(themeBtn.getAttribute("data-theme-choice"));

    var trigger = t.closest('[aria-haspopup="menu"][aria-controls]');
    if (trigger) {
      if (openMenu && openMenu.trigger === trigger) hideMenu(false);
      else showMenu(trigger, false);
      return;
    }

    if (openMenu) {
      var item = t.closest('[role^="menuitem"]');
      if (item && openMenu.menu.contains(item)) {
        if (item.getAttribute("role") === "menuitemradio") {
          items(openMenu.menu, '[role="menuitemradio"]').forEach(function (r) {
            r.setAttribute("aria-checked", String(r === item));
          });
        } else if (item.getAttribute("role") === "menuitemcheckbox") {
          item.setAttribute("aria-checked", String(item.getAttribute("aria-checked") !== "true"));
          return;
        }
        hideMenu(true);
      } else if (!openMenu.menu.contains(t)) {
        hideMenu(false);
      }
    }

    var opener = t.closest("[data-dialog-open]");
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute("data-dialog-open"));
      if (dialog && dialog.showModal) dialog.showModal();
      return;
    }

    var closer = t.closest("[data-dialog-close]");
    if (closer) {
      var d = closer.closest("dialog");
      if (d) d.close(closer.getAttribute("data-dialog-close") || "");
      return;
    }

    // Click on the backdrop closes the dialog
    if (t.tagName === "DIALOG" && t.classList.contains("ui-dialog") && t.open) {
      var r = t.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) t.close("");
    }
  });

  document.addEventListener("keydown", function (e) {
    var t = e.target;

    if (openMenu) {
      if (e.key === "Escape") { e.preventDefault(); hideMenu(true); return; }
      if (e.key === "Tab") { hideMenu(false); return; }
      if (openMenu.menu.contains(t)) {
        var list = items(openMenu.menu, '[role^="menuitem"]');
        var i = nextIndex(e.key, list.indexOf(t), list.length, true);
        if (i > -1) { e.preventDefault(); list[i].focus(); }
        return;
      }
    }

    var trigger = t.closest && t.closest('[aria-haspopup="menu"][aria-controls]');
    if (trigger && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      showMenu(trigger, e.key === "ArrowUp");
      return;
    }

    var radio = t.closest && t.closest('[role="radiogroup"] [role="radio"]');
    if (radio) {
      var radios = items(radio.closest('[role="radiogroup"]'), '[role="radio"]');
      var ri = nextIndex(e.key, radios.indexOf(radio), radios.length, false);
      if (ri > -1) { e.preventDefault(); radios[ri].focus(); selectRadio(radios[ri]); }
      return;
    }

    var tab = t.closest && t.closest('[role="tablist"] [role="tab"]');
    if (tab) {
      var tabs = items(tab.closest('[role="tablist"]'), '[role="tab"]');
      var ti = nextIndex(e.key, tabs.indexOf(tab), tabs.length, false);
      if (ti > -1) { e.preventDefault(); selectTab(tabs[ti], true); }
    }
  });

  // Initialise roving tabindex and theme controls once the DOM is ready
  function init() {
    syncThemeControls(theme.get());
    document.querySelectorAll('[role="radiogroup"]').forEach(function (g) {
      var radios = g.querySelectorAll('[role="radio"]');
      var checked = g.querySelector('[role="radio"][aria-checked="true"]') || radios[0];
      radios.forEach(function (r) { r.tabIndex = r === checked ? 0 : -1; });
    });
    document.querySelectorAll('[role="tablist"]').forEach(function (l) {
      l.querySelectorAll('[role="tab"]').forEach(function (t) {
        t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.UI = { theme: theme, toast: toast, init: init };
})();

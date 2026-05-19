// src/tui.tsx
import { memo as _$memo } from "@opentui/solid";
import { createComponent as _$createComponent } from "@opentui/solid";
import { effect as _$effect } from "@opentui/solid";
import { insert as _$insert } from "@opentui/solid";
import { setProp as _$setProp } from "@opentui/solid";
import { createTextNode as _$createTextNode } from "@opentui/solid";
import { insertNode as _$insertNode } from "@opentui/solid";
import { createElement as _$createElement } from "@opentui/solid";
import { For, Show, createSignal } from "solid-js";
var MAX_SESSIONS = 5;
var SPINNER_FRAMES = ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
function responseItems(response) {
  if (Array.isArray(response)) return response;
  if (response && typeof response === "object") {
    const result = response;
    if (Array.isArray(result.items)) return result.items;
    if (Array.isArray(result.data)) return result.data;
    if (Array.isArray(result.data?.items)) return result.data.items;
  }
  return [];
}
function formatRelativeTime(timestamp) {
  const elapsed = Date.now() - timestamp;
  const minute = 6e4;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (elapsed < minute) return "just now";
  if (elapsed < hour) return `${Math.round(elapsed / minute)}m ago`;
  if (elapsed < day) return `${Math.round(elapsed / hour)}h ago`;
  return `${Math.round(elapsed / day)}d ago`;
}
function statusLabel(status, visualStatus2) {
  if (visualStatus2 === "error") return "error";
  if (!status || status.type === "idle") return "done";
  if (status.type === "retry") return `retry ${status.attempt}`;
  return "running";
}
function statusSymbol(visualStatus2, spinnerFrame) {
  if (visualStatus2 === "busy") return spinnerFrame;
  if (visualStatus2 === "error") return "\u2715";
  return "\u2713";
}
function visualStatus(status, failedIDs, sessionID) {
  if (failedIDs.has(sessionID)) return "error";
  if (!status || status.type === "idle") return "success";
  return "busy";
}
function sortSessions(rows) {
  const rank = (status) => {
    if (status === "busy") return 0;
    if (status === "error") return 1;
    return 2;
  };
  return [...rows].sort((left, right) => {
    const rankDifference = rank(left.status) - rank(right.status);
    if (rankDifference !== 0) return rankDifference;
    return right.updated - left.updated;
  });
}
var tui = async (api) => {
  const [sessions, setSessions] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [loadError, setLoadError] = createSignal(null);
  const [spinnerIndex, setSpinnerIndex] = createSignal(0);
  const failedSessionIDs = /* @__PURE__ */ new Set();
  const spinnerTimer = setInterval(() => {
    setSpinnerIndex((current) => (current + 1) % SPINNER_FRAMES.length);
  }, 120);
  api.lifecycle.onDispose(() => clearInterval(spinnerTimer));
  const refreshSessions = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const result = await api.client.v2.session.list({
        path: api.state.path.worktree,
        limit: 25,
        order: "desc"
      });
      const rows = responseItems(result).map((session) => {
        const runtimeStatus = api.state.session.status(session.id);
        const currentVisualStatus = visualStatus(runtimeStatus, failedSessionIDs, session.id);
        const label = statusLabel(runtimeStatus, currentVisualStatus);
        return {
          id: session.id,
          title: session.title || "Untitled session",
          subtitle: `${label} \xB7 ${formatRelativeTime(session.time.updated)}`,
          updated: session.time.updated,
          status: currentVisualStatus
        };
      });
      const nextSessions = sortSessions(rows).slice(0, MAX_SESSIONS);
      setSessions(nextSessions);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };
  const refreshSoon = () => {
    queueMicrotask(() => {
      void refreshSessions();
    });
  };
  const unsubscribeHandlers = [api.event.on("server.connected", refreshSoon), api.event.on("session.created", refreshSoon), api.event.on("session.updated", refreshSoon), api.event.on("session.deleted", refreshSoon), api.event.on("session.idle", (event) => {
    failedSessionIDs.delete(event.properties.sessionID);
    refreshSoon();
  }), api.event.on("session.error", (event) => {
    if (event.properties.sessionID) {
      failedSessionIDs.add(event.properties.sessionID);
    }
    refreshSoon();
  }), api.event.on("session.status", refreshSoon)];
  api.lifecycle.onDispose(() => {
    unsubscribeHandlers.forEach((unsubscribe) => unsubscribe());
  });
  void refreshSessions();
  api.slots.register({
    order: 0,
    slots: {
      sidebar_title: () => {
        return (() => {
          var _el$ = _$createElement("text"), _el$2 = _$createElement("strong");
          _$insertNode(_el$, _el$2);
          _$insertNode(_el$2, _$createTextNode(`Recent Sessions`));
          return _el$;
        })();
      },
      sidebar_content: () => {
        const spinnerFrame = SPINNER_FRAMES[spinnerIndex()];
        return (() => {
          var _el$4 = _$createElement("box"), _el$5 = _$createElement("text");
          _$insertNode(_el$4, _el$5);
          _$setProp(_el$4, "flexDirection", "column");
          _$setProp(_el$4, "gap", 1);
          _$insertNode(_el$5, _$createTextNode(`Active first \xB7 last 5 from current project`));
          _$insert(_el$4, _$createComponent(Show, {
            get when() {
              return loading();
            },
            get children() {
              var _el$7 = _$createElement("text"), _el$8 = _$createTextNode(` Loading recent sessions\u2026`);
              _$insertNode(_el$7, _el$8);
              _$insert(_el$7, () => SPINNER_FRAMES[spinnerIndex()], _el$8);
              _$effect((_$p) => _$setProp(_el$7, "fg", api.theme.current.textMuted, _$p));
              return _el$7;
            }
          }), null);
          _$insert(_el$4, _$createComponent(Show, {
            get when() {
              return loadError();
            },
            children: (message) => (() => {
              var _el$13 = _$createElement("text"), _el$14 = _$createTextNode(`\u2715 `);
              _$insertNode(_el$13, _el$14);
              _$insert(_el$13, message, null);
              _$effect((_$p) => _$setProp(_el$13, "fg", api.theme.current.error, _$p));
              return _el$13;
            })()
          }), null);
          _$insert(_el$4, _$createComponent(Show, {
            get when() {
              return _$memo(() => !!(!loading() && !loadError()))() && sessions().length === 0;
            },
            get children() {
              var _el$9 = _$createElement("text");
              _$insertNode(_el$9, _$createTextNode(`No recent sessions found for this project`));
              _$effect((_$p) => _$setProp(_el$9, "fg", api.theme.current.textMuted, _$p));
              return _el$9;
            }
          }), null);
          _$insert(_el$4, _$createComponent(Show, {
            get when() {
              return _$memo(() => !!(!loading() && !loadError()))() && sessions().length > 0;
            },
            get children() {
              return [(() => {
                var _el$1 = _$createElement("box"), _el$10 = _$createElement("box");
                _$insertNode(_el$1, _el$10);
                _$setProp(_el$1, "border", true);
                _$setProp(_el$1, "padding", 1);
                _$setProp(_el$10, "flexDirection", "column");
                _$setProp(_el$10, "gap", 1);
                _$insert(_el$10, _$createComponent(For, {
                  get each() {
                    return sessions();
                  },
                  children: (session) => (() => {
                    var _el$15 = _$createElement("box"), _el$16 = _$createElement("text"), _el$17 = _$createTextNode(` `), _el$18 = _$createElement("text");
                    _$insertNode(_el$15, _el$16);
                    _$insertNode(_el$15, _el$18);
                    _$setProp(_el$15, "flexDirection", "column");
                    _$insertNode(_el$16, _el$17);
                    _$insert(_el$16, () => statusSymbol(session.status, spinnerFrame), _el$17);
                    _$insert(_el$16, () => session.title, null);
                    _$insert(_el$18, () => session.subtitle);
                    _$effect((_$p) => _$setProp(_el$18, "fg", api.theme.current.textMuted, _$p));
                    return _el$15;
                  })()
                }));
                _$effect((_$p) => _$setProp(_el$1, "borderColor", api.theme.current.borderSubtle, _$p));
                return _el$1;
              })(), (() => {
                var _el$11 = _$createElement("text");
                _$insertNode(_el$11, _$createTextNode(`Session list loaded`));
                _$effect((_$p) => _$setProp(_el$11, "fg", api.theme.current.textMuted, _$p));
                return _el$11;
              })()];
            }
          }), null);
          _$effect((_$p) => _$setProp(_el$5, "fg", api.theme.current.textMuted, _$p));
          return _el$4;
        })();
      }
    }
  });
};
export {
  tui
};

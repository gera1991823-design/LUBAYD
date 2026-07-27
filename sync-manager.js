"use strict";

(() => {
  let running = false;

  function isNetworkOrAuthError(error) {
    const code = String(error?.code || "").toLowerCase();
    const message = String(error?.message || "").toLowerCase();
    return [
      "network-request-failed",
      "unavailable",
      "unauthenticated",
      "permission-denied",
      "storage/retry-limit-exceeded"
    ].some((token) => code.includes(token) || message.includes(token));
  }

  async function process({ uid, adapter, onProgress = () => {}, onChange = () => {} } = {}) {
    if (running || !uid || typeof adapter !== "function" || !window.OfflineDB) {
      return { processed: 0, failed: 0, errors: [] };
    }

    running = true;
    let processed = 0;
    let failed = 0;
    const errors = [];

    try {
      const items = await OfflineDB.getPendingQueue(uid);
      const total = items.length;
      await onChange({ running: true, total, remaining: total, processed, failed });

      for (let index = 0; index < items.length; index += 1) {
        if (!navigator.onLine) break;

        const item = items[index];
        item.status = "syncing";
        item.attempts = Number(item.attempts || 0) + 1;
        item.lastAttemptAt = Date.now();
        await OfflineDB.updateQueue(item);
        await onProgress({ item, index: index + 1, total });

        try {
          await adapter(item);
          await OfflineDB.deleteQueue(item.id);
          processed += 1;
        } catch (error) {
          item.status = "pending";
          item.lastError = error?.message || String(error);
          item.lastErrorCode = error?.code || "";
          item.lastErrorAt = Date.now();
          await OfflineDB.updateQueue(item);
          failed += 1;
          errors.push({ id: item.id, type: item.type, message: item.lastError, code: item.lastErrorCode });
          console.error("Sincronizacion pendiente", item.type, error);

          if (isNetworkOrAuthError(error)) {
            await onChange({
              running: true,
              total,
              remaining: total - index,
              processed,
              failed,
              lastError: item.lastError
            });
            break;
          }
        }

        await onChange({
          running: true,
          total,
          remaining: total - index - 1,
          processed,
          failed,
          lastError: (errors.length ? errors[errors.length - 1].message : "")
        });
      }
    } finally {
      running = false;
      await onChange({ running: false, processed, failed, errors, lastError: (errors.length ? errors[errors.length - 1].message : "") });
    }

    return { processed, failed, errors };
  }

  window.LubaydSyncQueue = { process, isRunning: () => running };
})();

"use strict";

(() => {
  let running = false;

  async function process({ uid, adapter, onProgress = () => {}, onChange = () => {} } = {}) {
    if (running || !uid || !adapter || !window.OfflineDB) return { processed: 0, failed: 0 };
    running = true;
    let processed = 0;
    let failed = 0;
    try {
      const items = await OfflineDB.getPendingQueue(uid);
      const total = items.length;
      await onChange({ running: true, total, remaining: total, processed, failed });
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        item.status = "syncing";
        item.attempts = Number(item.attempts || 0) + 1;
        await OfflineDB.updateQueue(item);
        await onProgress({ item, index: index + 1, total });
        try {
          await adapter(item);
          await OfflineDB.deleteQueue(item.id);
          processed += 1;
        } catch (error) {
          item.status = "pending";
          item.lastError = error?.message || String(error);
          await OfflineDB.updateQueue(item);
          failed += 1;
          console.error("Sincronizacion pendiente", item.type, error);
        }
        await onChange({ running: true, total, remaining: total - index - 1, processed, failed });
      }
    } finally {
      running = false;
      await onChange({ running: false, processed, failed });
    }
    return { processed, failed };
  }

  window.LubaydSyncQueue = { process, isRunning: () => running };
})();

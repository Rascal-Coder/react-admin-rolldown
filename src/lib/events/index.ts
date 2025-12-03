import { Subject } from "rxjs";

import type { EventsRecord } from "./types";

export default class Events {
  private _events: EventsRecord = {};
  private _emitFirstEvents: Record<string, unknown[]> = {};
  private _unsubscribe(subjects: Subject<unknown>[], name: keyof EventsRecord) {
    for (const item of subjects) {
      item.unsubscribe();
    }
    this._events[name] = [];
  }
  /**
   * 订阅事件，支持先emit，后on，也能触发emit
   */
  on(name: keyof EventsRecord, callback: (data?: unknown) => void) {
    const subjects = this._events[name];
    const subscription = new Subject();
    if (subjects) {
      subjects.push(subscription);
    } else {
      this._events[name] = [subscription];
    }
    subscription.subscribe(callback);
    if (name in this._emitFirstEvents) {
      for (const item of this._emitFirstEvents[name]) {
        callback(item);
      }
      delete this._emitFirstEvents[name];
    }
    return subscription;
  }
  /**
   * 发布事件，支持先emit，后on，也能触发emit
   */
  emit(name: keyof EventsRecord, data?: unknown) {
    const subjects = this._events[name];
    if (subjects && subjects.length > 0) {
      for (const item of subjects) {
        item.next(data);
      }
    } else if (this._emitFirstEvents[name]) {
      this._emitFirstEvents[name].push(data);
    } else {
      this._emitFirstEvents[name] = [data];
    }
  }
  remove(name: keyof EventsRecord, subscription?: Subject<unknown>) {
    const { _events } = this;
    const subjects = _events[name];
    if (subscription) {
      subscription.unsubscribe();
      if (subjects) {
        _events[name] = subjects.filter((item) => item !== subscription);
      }
      return;
    }
    if (subjects) {
      this._unsubscribe(subjects, name);
    }
  }
  removeAll() {
    const { _events } = this;
    for (const name of Object.keys(_events)) {
      const subjects = _events[name];
      this._unsubscribe(subjects, name);
    }
    this._events = {};
  }
}

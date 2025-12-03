import type { Subject } from "rxjs";

export type EventsRecord = Record<string, Subject<unknown>[]>;

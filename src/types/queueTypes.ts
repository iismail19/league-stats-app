export interface Queue {
  queueId: number;
  map: string;
  description: string | null;
  notes: string | null;
}

export type QueueData = Queue[];

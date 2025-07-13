export interface Position {
  x: number;
  y: number;
}

export interface CanvasElement {
  id: string;
  type: string;
  position: Position;
  properties: Record<string, any>;
}
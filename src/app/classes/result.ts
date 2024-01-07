export class Result {
  id: number;
  x: string;
  y: string;
  r: string;
  condition: boolean;
  time: number;
  timeOfWork: number;

  constructor(id: number, x: string, y: string, r: string, condition: boolean, time: number, timeOfWork: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.condition = condition;
    this.time = time;
    this.timeOfWork = timeOfWork;
  }
}

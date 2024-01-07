import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graph: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private readonly graphWidth: number;
  private readonly graphHeight: number;
  private readonly scaleX: number;
  private readonly scaleY: number;
  private readonly xAxis: number;
  private readonly yAxis: number;
  private readonly shiftNumberNames: number;
  private readonly shiftAxisNames: number;
  constructor(graph: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.graph = graph;
    this.context = context;
    this.graphWidth = this.graph.clientWidth;
    this.graphHeight = this.graph.clientHeight;
    this.scaleX = 40;
    this.scaleY = 40;
    this.xAxis = Math.round(this.graphWidth / this.scaleX / 2) * this.scaleX;
    this.yAxis = Math.round(this.graphHeight / this.scaleY / 2) * this.scaleY;
    this.shiftNumberNames = 3;
    this.shiftAxisNames = 15;
  }
  drawGraphBackground() {
    this.context.fillStyle = "#ffffff"; //белый цвет для фона
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, this.graph.width, this.graph.height);
    this.context.fillStyle = "#000000"; //черный цвет для цифр

    //Рисуем клетки
    this.context.font = `${Math.round(this.scaleX / 2)}px Georgia`;
    this.context.textAlign = "left";
    this.context.textBaseline = "top";

    this.context.beginPath();
    this.context.strokeStyle = "rgb(224, 224, 224, 1)";
    this.context.lineWidth = 1;
    for (let i = 0; i <= this.graphWidth; i = i + this.scaleX) {
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.graphHeight);
      this.context.fillText(
        `${(i - this.xAxis) / this.scaleX}`,
        i + this.shiftNumberNames,
        this.yAxis + this.shiftNumberNames
      );
    }
    for (let i = 0; i <= this.graphHeight; i = i + this.scaleY) {
      this.context.moveTo(0, i);
      this.context.lineTo(this.graphWidth, i);

      this.context.fillText(
        `${(this.yAxis - i) / this.scaleY}`,
        this.xAxis + this.shiftNumberNames,
        i + this.shiftNumberNames
      );
    }
    this.context.stroke();
    this.context.closePath();

    //Рисуем оси
    this.context.beginPath();
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = 2;

    this.context.moveTo(this.xAxis, 0);
    this.context.lineTo(this.xAxis, this.graphHeight);
    this.context.fillText("y", this.xAxis - this.shiftAxisNames, 0);

    this.context.moveTo(0, this.yAxis);
    this.context.lineTo(this.graphHeight, this.yAxis);
    this.context.fillText("x", this.graphWidth - this.shiftAxisNames, this.yAxis - 20);

    this.context.stroke();
    this.context.closePath();
  }
  drawGraph(r: number) {
    this.drawGraphBackground();
    if (r === 0) return;

    let r_abs: number = Math.abs(r);

    //График
    this.context.fillStyle = "#1E90FF";
    this.context.strokeStyle = "rgb(64, 130, 109, 0)";

    //3 четверть
    this.context.beginPath();
    this.context.globalAlpha = 0.5;
    this.context.lineWidth = 2;
    this.context.moveTo(this.xAxis, this.yAxis);
    this.context.lineTo(this.xAxis - Math.sign(r) * ((r_abs / 2) * this.scaleX ), this.yAxis);
    this.context.lineTo(this.xAxis, this.yAxis + Math.sign(r) * (r_abs * this.scaleY + 1));
    this.context.lineTo(this.xAxis, this.yAxis);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    //2 четверть
    this.context.beginPath();
    if (r > 0) {
      this.context.arc(this.xAxis, this.yAxis, (r_abs / 2) * this.scaleX + 1, Math.PI, 1.5 * Math.PI);
    } else {
      this.context.arc(this.xAxis, this.yAxis, (r_abs / 2) * this.scaleX + 1, 0, 0.5 * Math.PI);
    }
    this.context.lineTo(this.xAxis, this.yAxis);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();

    //4 четверть
    this.context.beginPath();
    this.context.fillRect(this.xAxis, this.yAxis, Math.sign(r) * (r_abs * this.scaleX + 1), Math.sign(r) * (r_abs / 2 * this.scaleY));
    this.context.closePath();

    // this.drawDotsFromTable(r);

    // let clickDot = JSON.parse(window.sessionStorage.getItem("clickDot"));
    // let dotsList = JSON.parse(window.sessionStorage.getItem("allDots"));

    // if (clickDot !== null) {
    //   this.drawPoint(clickDot);
    // }
    // if (dotsList !== null) {
    //   for (let i = 0; i < dotsList.length; i++) {
    //     this.drawPoint(dotsList[i]);
    //   }
    // }
  }
}

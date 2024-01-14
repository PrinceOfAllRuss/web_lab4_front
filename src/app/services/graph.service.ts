import { Injectable } from '@angular/core';
import {Result} from "../classes/result";

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
  getXAxis() {
    return this.xAxis;
  }
  getYAxis() {
    return this.yAxis;
  }
  getScaleX() {
    return this.scaleX;
  }
  getScaleY() {
    return this.scaleY;
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

  drawPoint(x: number, y: number, condition: boolean) {
    // console.log('draw point');
    this.context.beginPath();
    switch(condition) {
      case true : this.context.fillStyle = " #34C924";
        break;
      case false : this.context.fillStyle = "#f5002d";
    }
    this.context.globalAlpha = 1;
    this.context.arc(this.xAxis + x * this.scaleX,
      this.yAxis - y * this.scaleY, 3, 0, 2 * Math.PI);
    this.context.fill();
    this.context.closePath();
  }

  drawDotsFromTable(r: number, results: Result[]) {
    for (let i = 0; i < results.length; i++) {
      if (parseFloat(results[i].r) == r) {
        this.drawPoint(parseFloat(results[i].x), parseFloat(results[i].y), results[i].condition);
      }
    }
  }

  drawGraph(r: number, results: Result[]) {
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

    this.drawDotsFromTable(r, results);
  }
}

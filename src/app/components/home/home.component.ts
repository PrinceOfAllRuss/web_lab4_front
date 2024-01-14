import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GraphService} from "../../services/graph.service";
import {LoginService} from "../../services/login.service";
import {FormService} from "../../services/form.service";
import {TableService} from "../../services/table.service";
import {NgForOf, NgIf} from "@angular/common";
import {Result} from "../../classes/result";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  template: `
    <div class="home_div">
      <div id="div_graph">
        <canvas #canvas id="graph" width="500" height="500" (click)="sendPointFromGraph($event)"></canvas>
      </div>
      <div>
        <div id="div_with_form">
          <label for="x">Select X </label>
          <select #x id="x">
            <option value="-2">-2</option>
            <option value="-1.5">-1.5</option>
            <option value="-1">-1</option>
            <option value="-0.5">-0.5</option>
            <option value="0" selected>0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
          </select>
          <br/>
          <br/>
          <label for="y">Select Y (from -3 to 5) </label>
          <input type="text" id="y" #y />
          <br/>
          <p #errorY id="errorY" class="error"></p>
          <label for="r">Select R </label>
          <select #r id="r" (change)="changeR()">
            <option value="-2">-2</option>
            <option value="-1.5">-1.5</option>
            <option value="-1">-1</option>
            <option value="-0.5">-0.5</option>
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2" selected>2</option>
          </select>
          <br/>
          <button type="button" class="submit" (click)="submitForm()">Submit</button>
          <br/>
          <br/>
          <button type="button" class="button" (click)="exit()">Exit</button>
        </div>
      </div>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>x</th>
            <th>y</th>
            <th>r</th>
            <th>Condition</th>
            <th>Time of work in milliseconds</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let result of results">
            <td>{{result.x}}</td>
            <td>{{result.y}}</td>
            <td>{{result.r}}</td>
            <td>{{result.condition}}</td>
            <td>{{result.timeOfWork}}</td>
            <td>{{fromStringToDate(result.time)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("x", {static: false}) x!: ElementRef;
  @ViewChild("y", {static: false}) y!: ElementRef;
  @ViewChild("r", {static: false}) r!: ElementRef;
  @ViewChild("canvas", {static: false}) canvas!: ElementRef;
  @ViewChild("errorY", {static: false}) errorY!: ElementRef;
  results: Result[] = [];
  constructor(private loginService: LoginService, private formService: FormService,
              private tableService: TableService, private router: Router) {
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      this.router.navigate(['login']);
      console.log(1);
    } else {
      console.log(2);
    }
  }

  fromStringToDate(time: number) {
    let date: Date = new Date(time);
    return date.toLocaleString();
  }
  async ngAfterViewInit() {
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      this.router.navigate(['login']);
      console.log(1);
    } else {
      console.log(2);
    }
    this.results = await this.tableService.getAllResults();
    this.drawGraph(this.r.nativeElement.value);
    this.subscribeOnChanges();
  }
  drawGraph(r: number) {
    const graph: HTMLCanvasElement = this.canvas.nativeElement;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    const graphService: GraphService = new GraphService(graph, context);
    graphService.drawGraphBackground();
    graphService.drawGraph(r, this.results);
  }
  changeR() {
    this.drawGraph(this.r.nativeElement.value);
  }
  async submitForm() {
    this.checkToken();
    let x: string = this.x.nativeElement.value;
    let y: string = this.y.nativeElement.value.replace(',', '.');
    let r: string = this.r.nativeElement.value;
    let method: string = 'form';

    let substr: string = y;
    if (r.length > 8) {
      substr = r.substring(0, 7);
    }
    if (substr == '' || parseFloat(substr) > 5 || parseFloat(substr) < -3) {
      this.errorY.nativeElement.innerHTML = 'Wrong Y';
    } else {
      this.errorY.nativeElement.innerHTML = '';
      await this.formService.postRequest(x, y, r, method);
      this.results = await this.tableService.getAllResults();
      this.drawGraph(parseFloat(r));
    }
  }
  async sendPointFromGraph(event: any) {
    this.checkToken();
    let obj: {coordX: number, coordY: number} = this.getDataFromGraph(event);
    let r: string = this.r.nativeElement.value;
    let method: string = 'graph';
    console.log('(' + obj.coordX + ';' + obj.coordY + ')');
    await this.formService.postRequest(obj.coordX.toString(), obj.coordY.toString(), r, method);
    this.results = await this.tableService.getAllResults();
    this.drawGraph(parseFloat(r));
  }

  getDataFromGraph(event: any) {
    const graph: HTMLCanvasElement = this.canvas.nativeElement;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    const graphService: GraphService = new GraphService(graph, context);
    let rect: DOMRect = graph.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = rect.top - event.clientY;
    let coordX = (x - graphService.getXAxis()) / graphService.getScaleX();
    let coordY = (y + graphService.getYAxis()) / graphService.getScaleY();
    return {coordX: coordX, coordY: coordY};
  }
  exit() {
    this.loginService.logoutRequest();
  }

  async subscribeOnChanges() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    let response = await this.tableService.subscribeOnTableChanges();
    let data: any = await response.json();
    this.results = await data as Result[];
    let r: string = this.r.nativeElement.value;
    this.drawGraph(parseFloat(r));
    await this.subscribeOnChanges();
  }

  checkToken() {
    if (localStorage.getItem('token') == '' || localStorage.getItem('token') == undefined) {
      this.router.navigate(['login']);
    }
  }
}

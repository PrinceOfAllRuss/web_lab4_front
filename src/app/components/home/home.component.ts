import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GraphService} from "../../services/graph.service";
import {LoginService} from "../../services/login.service";
import {FormService} from "../../services/form.service";
import {TableService} from "../../services/table.service";
import {NgForOf, NgIf} from "@angular/common";
import {Result} from "../../classes/result";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  template: `
    <div>
      <canvas #canvas style="border: 1px solid" id="graph" width="500" height="500"></canvas>
    </div>
    <div>
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

      <label for="y">Select Y (from -3 to 5) </label>
      <input type="text" id="y" #y />
      <br/>

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
      <button (click)="login()" style="color: blue">Login</button>
      <br/>
      <button (click)="submitForm()">Submit</button>
      <br/>
      <button (click)="getTableOfResults()">Get table with results</button>
      <br/>
      <button (click)="testOne()">Test1</button>
    </div>
    <div>
      <table width="100%" border="1">
          <tr>
            <th>x</th>
            <th>y</th>
            <th>r</th>
            <th>Condition</th>
            <th>Time of work in milliseconds</th>
            <th>Time</th>
          </tr>
        <ng-container *ngIf="sessionStorage.getItem('results') !== null ||
        sessionStorage.getItem('results') !== undefined">
          <tr *ngFor="let result of results">
            <td>{{result.x}}</td>
            <td>{{result.y}}</td>
            <td>{{result.r}}</td>
            <td>{{result.condition}}</td>
            <td>{{result.timeOfWork}}</td>
            <td>{{result.time}}</td>
          </tr>
        </ng-container>
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
  results: Result[] = JSON.parse(sessionStorage.getItem('results')!);
  protected readonly sessionStorage = sessionStorage;
  constructor(private loginService: LoginService,
              private formService: FormService,
              private tableService: TableService) {}
  ngAfterViewInit() {
    this.drawGraph(this.r.nativeElement.value);
  }
  drawGraph(r: number) {
    const graph: HTMLCanvasElement = this.canvas.nativeElement;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    const graphService: GraphService = new GraphService(graph, context);
    graphService.drawGraphBackground();
    graphService.drawGraph(r);
  }
  changeR() {
    this.drawGraph(this.r.nativeElement.value);
  }
  async submitForm() {
    let x: string = this.x.nativeElement.value;
    let y: string = this.y.nativeElement.value;
    let r: string = this.r.nativeElement.value;
    this.formService.postRequest(x, y, r);
    let new_result = await this.getTableOfResults();
    sessionStorage.setItem('results', JSON.stringify(new_result));
    console.log(this.results);
    console.log(new_result);
    this.results.push(new_result[new_result.length - 1]);
    console.log('!');
    console.log(this.results);

  }
  login() {
    this.loginService.postRequest("Fedor", "1234", "login");
  }
  testOne() {
    this.tableService.getRequestOne();
    console.log(sessionStorage.getItem('results'));
  }
  async getTableOfResults(): Promise<Result[]> {
    return await this.tableService.getAllResultsFetch();
  }
}

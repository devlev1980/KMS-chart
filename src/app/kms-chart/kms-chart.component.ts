import {Component, OnInit, ViewChild} from '@angular/core';
import {KmsChartService} from './kms-chart.service';
import {GoogleChartInterface} from 'ng2-google-charts/lib/google-chart/google-chart.component';
import {ChartSelectEvent, GoogleChartComponent} from 'ng2-google-charts';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IQuote} from '../models/chart-model';

@Component({
  selector: 'yl-kms-chart',
  templateUrl: './kms-chart.component.html',
  styleUrls: ['./kms-chart.component.scss']
})
export class KmsChartComponent implements OnInit {

  @ViewChild('chart', {static: false})
  chart: GoogleChartComponent;
  barChart: GoogleChartInterface;
  isShowEditField: boolean = false;
  quoteForm: FormGroup;
  selectedQuote: any[] = [];
  dataQuotes: IQuote[][] = [];
  selectedRow: number;

  constructor(private kmsService: KmsChartService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeChart();
    this.kmsService.getKmsChartData()
      .subscribe(data => {
        this.barChart.dataTable = this.dataQuotes = data.quotes;
      });
    this.initializeForm();
  }

  initializeChart() {
    this.barChart = {
      chartType: 'Bar',
      dataTable: [],
      firstRowIsData: true,
      options: {
        height: 400,
        width: 1200,
        chart: {
          title: 'AAPL',
          subtitle: 'Sales, Expenses, and Profit: 2020',
        }
      },
    };
  }

  initializeForm() {
    this.quoteForm = this.fb.group({
      quote: this.fb.control('', Validators.required),
    });
  }

  select(event: ChartSelectEvent) {
    if (event) {
      this.selectedRow = event.row;
      this.isShowEditField = true;
      this.selectedQuote = event.selectedRowValues;
      this.quoteForm.get('quote').patchValue(event.selectedRowValues[1]);
    } else {
      this.isShowEditField = false;
    }
    if (event.row === null ) {
      this.isShowEditField = false;
    }


  }

  onSave(quoteForm: FormGroup) {
    this.dataQuotes[this.selectedRow][1] = quoteForm.get('quote').value;
    this.barChart.dataTable = this.dataQuotes;
    this.chart.draw(this.barChart);
    this.isShowEditField = false;
  }

}


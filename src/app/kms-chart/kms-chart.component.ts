import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {KmsChartService} from './kms-chart.service';
import {GoogleChartInterface} from 'ng2-google-charts/lib/google-chart/google-chart.component';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {ChartSelectEvent, GoogleChartComponent, RegionClickEvent} from 'ng2-google-charts';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'yl-kms-chart',
  templateUrl: './kms-chart.component.html',
  styleUrls: ['./kms-chart.component.scss']
})
export class KmsChartComponent implements OnInit {

  @ViewChild('chart', {static: false})
  chart: GoogleChartComponent;
  pieChart: GoogleChartInterface;
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
        this.pieChart.dataTable = this.dataQuotes = data.quotes;
      });
    this.initializeForm();
  }

  initializeChart() {
    this.pieChart = {
      chartType: 'Bar',
      dataTable: [],
      firstRowIsData: true,
      options: {title: 'AAPL', height: 400, width: 800},
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


  }

  onSave(quoteForm: FormGroup) {
    this.dataQuotes[this.selectedRow][1] = quoteForm.get('quote').value;
    this.pieChart.dataTable = this.dataQuotes;
    this.chart.draw(this.pieChart);
    this.isShowEditField = false;
  }

}

interface IQuote {
  quotes: [[string | number]];
}

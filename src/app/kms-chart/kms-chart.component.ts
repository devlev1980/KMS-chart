import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {KmsChartService} from './kms-chart.service';
import {ChartBase, ChartEditorComponent, ChartSelectionChangedEvent, GoogleChartComponent} from 'angular-google-charts';
import {GoogleChartInterface} from 'ng2-google-charts/lib/google-chart/google-chart.component';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';
import {ChartSelectEvent} from 'ng2-google-charts';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'yl-kms-chart',
  templateUrl: './kms-chart.component.html',
  styleUrls: ['./kms-chart.component.scss']
})
export class KmsChartComponent implements OnInit,OnChanges {

  pieChart: GoogleChartInterface;
  isShowEditField: boolean = false;
  quoteForm: FormGroup;
  selectedQuote: any[] = [];
  dataQuotes: any[] = [];
  selectedRow: number;

  constructor(private kmsService: KmsChartService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.pieChart = {
      chartType: 'Bar',
      dataTable: [],
      firstRowIsData: true,
      options: {title: 'AAPL', height: 400, width: 1200},
    };
    this.kmsService.getKmsChartData()
      .subscribe(data => {
        this.pieChart.dataTable = this.dataQuotes = data.quotes;
      });

    this.initializeForm();

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  initializeForm() {
    this.quoteForm = this.fb.group({
      quote: this.fb.control('', Validators.required),
    });
  }


  select(event: ChartSelectEvent) {
    console.log(event.row);
    this.selectedRow = event.row;
    this.isShowEditField = true;
    this.selectedQuote = event.selectedRowValues;
    this.quoteForm.get('quote').patchValue(event.selectedRowValues[1]);

  }

  onSave(quoteForm: FormGroup) {
    console.log(this.dataQuotes[this.selectedRow]);
    this.dataQuotes[this.selectedRow][1] = quoteForm.get('quote').value;
    this.pieChart.dataTable = this.dataQuotes;
    console.log(this.dataQuotes);
  }

  get quote() {
    return this.quoteForm.get('quote').value;
  }
}

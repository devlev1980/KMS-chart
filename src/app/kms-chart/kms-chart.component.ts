import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KmsChartService} from './kms-chart.service';
import {GoogleChartInterface} from 'ng2-google-charts/lib/google-chart/google-chart.component';
import {ChartSelectEvent, GoogleChartComponent} from 'ng2-google-charts';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IQuote} from '../models/chart-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'yl-kms-chart',
  templateUrl: './kms-chart.component.html',
  styleUrls: ['./kms-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KmsChartComponent implements OnInit, OnDestroy {

  @ViewChild('chart', {static: false})
  chart: GoogleChartComponent;
  barChart: GoogleChartInterface;
  isShowEditForm: boolean = false;
  editForm: FormGroup;
  selectedQuote: IQuote[];
  dataQuotes: IQuote[][] = [];
  selectedBar: number;
  subscription: Subscription;

  constructor(private kmsService: KmsChartService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeChart();
    this.subscription = this.kmsService.getKmsChartData()
      .subscribe(data => {
        this.barChart.dataTable = this.dataQuotes = data;
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
          subtitle: 'Sales AAPL of 2020',
        }
      },
    };
  }

  initializeForm() {
    this.editForm = this.fb.group({
      quote: this.fb.control('', Validators.required),
    });
  }

  select(event: ChartSelectEvent) {
    if (event) {
      this.selectedBar = event.row;
      this.isShowEditForm = true;
      this.selectedQuote = event.selectedRowValues;
      this.editForm.get('quote').patchValue(event.selectedRowValues[1]);
    } else {
      this.isShowEditForm = false;
    }
    if (event.row === null) {
      this.isShowEditForm = false;
    }


  }

  onSave(quoteForm: FormGroup) {
    this.dataQuotes[this.selectedBar][1] = quoteForm.get('quote').value;
    this.barChart.dataTable = this.dataQuotes;
    this.chart.draw(this.barChart);
    this.isShowEditForm = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


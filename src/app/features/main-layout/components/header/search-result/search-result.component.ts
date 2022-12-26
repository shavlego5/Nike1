import {Component, Input} from '@angular/core';
import {SearchService} from "../../../../../core/services";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @Input('inputValueLength') inputValueLength!: number;
  @Input('val') val!: string;

  constructor(public searchResult: SearchService) {
  }
}

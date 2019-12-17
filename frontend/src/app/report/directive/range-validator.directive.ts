import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { ReportService } from '../services/report.service';

@Directive({
  selector: '[appRangeValidator]'
})
export class RangeValidatorDirective {

  regex: RegExp;
  constructor(private el: ElementRef, private reportProvider: ReportService) { }

  @Input() appRangeValidator: string;

  @HostListener('input', ['$event']) onInput(event: Event) {
    if((this.reportProvider.firstFilterRange && this.reportProvider.firstFilterRange!=0) || (this.reportProvider.secondFilterRange && this.reportProvider.secondFilterRange!=0)){
    if (this.appRangeValidator == 'fromFilter') {
      this.regex = /^(?:[0-9]{0,2}(?:\.\d{1,2})?|100|100.00)$/
      if (!this.regex.test((<HTMLInputElement>event.currentTarget).value)) {
        if(event.currentTarget['value'].substr(-1) != '.' || (event.currentTarget['value']).split('.').length >2){
          this.reportProvider.firstFilterRange  = (event.currentTarget['value']).slice(0, -1);
          this.el.nativeElement.value =(event.currentTarget['value']).slice(0, -1);
        }        
      }
    }
    if(this.appRangeValidator == 'toFilter'){
      this.regex = /^(?:[0-9]{0,2}(?:\.\d{1,2})?|100|100.00)$/
      if (!this.regex.test((<HTMLInputElement>event.currentTarget).value)) {
        if(event.currentTarget['value'].substr(-1) != '.' || (event.currentTarget['value']).split('.').length >2){
          this.reportProvider.secondFilterRange  = (event.currentTarget['value']).slice(0, -1);
          this.el.nativeElement.value =(event.currentTarget['value']).slice(0, -1);
        }        
      }
    }
  }
 }
}


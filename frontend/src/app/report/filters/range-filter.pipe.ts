import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeFilter',  
})
export class RangeFilterPipe implements PipeTransform {

  transform(tableData: any, firstRange: any, secondRange: any, filterColumn: any): any {
    if (!tableData) return [];
    if ((!firstRange && parseInt(firstRange)!==0) || (!secondRange && parseInt(secondRange)!==0)) {
      return tableData;}
    else {
    return tableData.filter(tableRow => {     
       return parseFloat(tableRow[filterColumn])>=parseFloat(firstRange) && parseFloat(tableRow[filterColumn])<=parseFloat(secondRange)
    });
   }
  }
}

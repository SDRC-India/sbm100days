import { PipeTransform } from '@angular/core';
export declare class SearchPipePipe implements PipeTransform {
    transform(tableData: any[], searchText: string): any[];
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaFilter'
})
export class AreaFilterPipe implements PipeTransform {


  transform(areas: any, areaLevel: number, parentAreaId: number): IArea[] {

    
    
    if(areas != undefined && areas != null && areaLevel != undefined && areaLevel != null && parentAreaId != undefined && parentAreaId != null ){      
    

      switch(areaLevel){
        // case 1:
        //   return areas.State.filter(area => area.parentAreaId === parentAreaId)
        case 2:
          return areas.District.filter(area => area.parentAreaId == parentAreaId)
        case 3:
          return areas.Block.filter(area => area.parentAreaId == parentAreaId)
        case 4:
          let GP = 'Gram Panchayat';
          return areas[GP].filter(area => area.parentAreaId == parentAreaId)  
      }      
    }
    else {
      return [];
    }
  }

}

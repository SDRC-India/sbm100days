import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areaFilter'
})
export class AreaFilterPipe implements PipeTransform {
  

  transform(areas: any, areaLevel: number, parentAreaId: number, reportTypeId: number, roleId:number): IArea[] {
    
    if(areas != undefined && areas != null && areaLevel != undefined && areaLevel != null && (!areas.District || (parentAreaId != undefined && parentAreaId != null)) ){      
      if(roleId!=3 && (reportTypeId == 7 || reportTypeId==8)){
        return null;
      } else{
      switch(areaLevel){      
        case 2:
          return areas.District.filter(area => area.parentAreaId === parentAreaId)
        case 3:
          return areas.District ? areas.Block.filter(area => area.parentAreaId === parentAreaId): areas.Block
      }      
    }
   }
    else {
      return [];
    }
  }

}

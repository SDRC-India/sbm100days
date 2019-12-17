import { ThematicIndicatorModel } from "./thematic-indicator-model";
import { ThematicSubSectorModel } from "./thematic-sub-sector-model";

export class ThematicSectorModel {
    sectorId: number;
    sectorName: string;
    subSectors: ThematicSubSectorModel[];
    controlType?:string;
    type?:string;
}


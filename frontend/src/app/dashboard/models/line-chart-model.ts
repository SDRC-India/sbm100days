export interface LineModel{
    areaNid: number;
    value: number;
    timeperiod: string;
    key: string;
    areaName: string;
}
export interface LineChartModel{
    lineChartDetails: [LineModel]
}

package com.sbm.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.model.DashboardDailyTrendDataModel;
import com.sbm.model.DashboardMapDataModel;
import com.sbm.model.QuickStartModel;
import com.sbm.service.DashboardService;

@RestController
public class DashboardController 
{
	@Autowired
	private DashboardService dashboardService;
	
	@GetMapping(value = "/dailyIndicatorList", produces = "application/json")
	public ResponseEntity<Map<String,Map<String,DashboardMapDataModel>>> dailyIndicatorData(@RequestParam Map<String, String> 
	queryMap) {
		Map<String,DashboardMapDataModel> dataForMapsInDashboard = dashboardService.getDataForMapsInDashboard(queryMap);
		Map<String,Map<String,DashboardMapDataModel>> dataCollection=new LinkedHashMap<>();
		dataCollection.put("dataCollection", dataForMapsInDashboard);
		if (dataForMapsInDashboard.isEmpty()) {
			return new ResponseEntity<Map<String,Map<String,DashboardMapDataModel>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Map<String,Map<String,DashboardMapDataModel>>>(dataCollection, HttpStatus.OK);
	}
	
	@GetMapping(value = "/dailyTrendList", produces = "application/json")
	public ResponseEntity<List<DashboardDailyTrendDataModel>> dailyTrendData(@RequestParam Map<String, String> 
	queryMap) {
		List<DashboardDailyTrendDataModel> dataForTrendInDashboard = dashboardService.getDataForTrendChartInDashboard(queryMap);
		if (dataForTrendInDashboard.isEmpty()) {
			return new ResponseEntity<List<DashboardDailyTrendDataModel>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<DashboardDailyTrendDataModel>>(dataForTrendInDashboard, HttpStatus.OK);
	}
	
	@GetMapping(value="/quickStartData")
	public Map<String, QuickStartModel> quickStartData(@RequestParam("areaId")String areaCode) throws Exception {
		return dashboardService.quickStartData(areaCode);
	}
}

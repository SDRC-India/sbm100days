package com.sbm.service;

import java.util.List;
import java.util.Map;

import com.sbm.model.DashboardDailyTrendDataModel;
import com.sbm.model.DashboardMapDataModel;
import com.sbm.model.QuickStartModel;

/**
 * 
 * @author subrata
 *
 */
public interface DashboardService {
	
	Map<String, QuickStartModel> quickStartData(String areaCode);
	
	Map<String,DashboardMapDataModel> getDataForMapsInDashboard(Map<String, String> queryMap);
	
	List<DashboardDailyTrendDataModel> getDataForTrendChartInDashboard(Map<String, String> queryMap);

}

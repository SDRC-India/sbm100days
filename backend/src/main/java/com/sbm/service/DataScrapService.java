package com.sbm.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;

import com.sbm.domain.Area;
import com.sbm.domain.FormatA03;
import com.sbm.domain.FormatA03Weekly;

public interface DataScrapService {
	
	void formA03DataScraping();
	
	void formF42DataScraping();
	
	WebDriver getWebDriver();
	
	FormatA03Weekly getFtA03WklyDtaDomain(FormatA03 datadomain,List<FormatA03Weekly> 
	frmtA03LatestAllDataList,Map<Integer,FormatA03Weekly> frmtA03LatestAllDataMap
	,Map<Integer, Area> areaModelMap,Map<Integer,Date> areaDeadlineMap);
	
}

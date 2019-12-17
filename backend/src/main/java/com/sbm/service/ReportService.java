package com.sbm.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface ReportService 
{
	String getWeeklyPdfReport(Integer parentAreaId,Integer areaLevelForAllGps,Boolean showNonPerformingGp, HttpServletRequest request);
	
	List<Map<String,String>> getWeeklyExcelReport(Integer parentAreaId,Integer areaLevel,Boolean showNonPerformingGp);
	
	List<Map<String,String>> getWeeklyOdfDeclarationExcelReport(Integer parentAreaId);
	
	List<Map<String,String>> getWeeklyOdfVerifiedExcelReport(Integer parentAreaId);
	
	List<Map<String,String>> getWeeklyGeoTagStatusExcelReport(Integer parentAreaId,Integer areaLevel);
	
	List<Map<String,String>> getWeeklyDistrictRankingExcelData(Integer parentAreaId);
	
	String getWeeklyOdfDeclarationStatusPdf(Integer parentAreaId,HttpServletRequest request,String range);
	
	String getWeeklyOdfVerificationStatusPdf(Integer parentAreaId,HttpServletRequest request,String range);
	
	String getWeeklyGeoTagStatusPdf(Integer parentAreaId,Integer areaLevel,String range,HttpServletRequest request);
	
	String getWeeklyConsolidatedPdf(Integer parentAreaId,Integer areaLevel,HttpServletRequest request);
	
	List<Map<String, String>> getDailySupplyChainExcelData(Integer parentAreaId,Integer areaLevel);
	
	String getDailySupplyChainPdfReport(Integer parentAreaId,Integer areaLevelForAllGps,HttpServletRequest request);
	
	String getWeeklyDistricRankingPdf(Integer parentAreaId,HttpServletRequest request);
}

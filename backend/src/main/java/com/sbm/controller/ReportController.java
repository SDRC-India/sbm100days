package com.sbm.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.service.DailyReportFormatA03Service;
import com.sbm.service.DailyTrackerService;
import com.sbm.service.ReportService;

@RestController
public class ReportController {
	
	@Autowired
	private DailyTrackerService dailyTrackerService;
	
	@Autowired
	private DailyReportFormatA03Service formatA03DailyReportService;
	
	@Autowired
	private ReportService reportService;
	
	@GetMapping(value = "/weeklyDistrictRankingExcelData")
	public ResponseEntity<List<Map<String, String>>> weeklyDistrictRankingExcelData(
			@RequestParam("parentAreaId") Integer parentAreaId) {
		List<Map<String, String>>  weeklyDistrictRankingExcelDataList = 
				reportService.getWeeklyDistrictRankingExcelData(parentAreaId);
		if (weeklyDistrictRankingExcelDataList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(weeklyDistrictRankingExcelDataList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/dailySupplyChainExcelData")
	public ResponseEntity<List<Map<String, String>>> dailySupplyChainExcelData(@RequestParam("parentAreaId") Integer parentAreaId
			,@RequestParam(value="areaLevel",required=false) Integer areaLevel) {
		List<Map<String, String>>  dailySupplyChainExcelDataList = reportService.getDailySupplyChainExcelData(parentAreaId,areaLevel);
		if (dailySupplyChainExcelDataList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(dailySupplyChainExcelDataList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/weeklyExcel")
	public ResponseEntity<List<Map<String, String>>> weeklyDistrictwiseExcel(@RequestParam("parentAreaId") Integer parentAreaId
			,@RequestParam(value="areaLevel",required=false) Integer areaLevel
			,@RequestParam(value="showNonPerformingGp",required=false) Boolean showNonPerformingGp) {
		List<Map<String, String>> weeklyExcelReportList = 
				reportService.getWeeklyExcelReport(parentAreaId,areaLevel,showNonPerformingGp);
		if (weeklyExcelReportList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(weeklyExcelReportList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/weeklyOdfDeclaredExcel")
	public ResponseEntity<List<Map<String, String>>> weeklyOdfDeclaredExcel(@RequestParam("parentAreaId") Integer parentAreaId) {
		List<Map<String, String>> weeklyOdfDeclarationList = reportService
				.getWeeklyOdfDeclarationExcelReport(parentAreaId);
		if (weeklyOdfDeclarationList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(weeklyOdfDeclarationList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/weeklyOdfVerifiedExcel")
	public ResponseEntity<List<Map<String, String>>> weeklyOdfVerifiedExcel(@RequestParam("parentAreaId") Integer parentAreaId) {
		List<Map<String, String>> weeklyOdfVerifiedList = reportService
				.getWeeklyOdfVerifiedExcelReport(parentAreaId);
		if (weeklyOdfVerifiedList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(weeklyOdfVerifiedList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/weeklyGeoTagStatusExcel")
	public ResponseEntity<List<Map<String, String>>> weeklyGeoTagStatusExcel(@RequestParam("parentAreaId") Integer parentAreaId
			,@RequestParam(value="areaLevel",required=false) Integer areaLevel) {
		List<Map<String, String>> weeklyGeoTagStatusList = reportService
				.getWeeklyGeoTagStatusExcelReport(parentAreaId,areaLevel);
		if (weeklyGeoTagStatusList.isEmpty()) {
			return new ResponseEntity<List<Map<String, String>>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Map<String, String>>>(weeklyGeoTagStatusList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/weeklyDistrictRankingPdf")
	public String weeklyDistrictRankingPdf(@RequestParam("parentAreaId") int parentAreaId,
			HttpServletRequest request){
		return reportService.getWeeklyDistricRankingPdf(parentAreaId,request);
	}
	
	@GetMapping(value = "/dailySupplyChainPdf")
	public String dailySupplyChainPdf(@RequestParam("parentAreaId") int parentAreaId,
			@RequestParam(value="areaLevel",required=false) Integer areaLevel,HttpServletRequest request){
		return reportService.getDailySupplyChainPdfReport(parentAreaId,areaLevel,request);
	}
	
	@GetMapping(value = "/weeklyPdf")
	public String weeklyDistrictwisePdf(@RequestParam("parentAreaId") int parentAreaId,
			@RequestParam(value="areaLevel",required=false) Integer areaLevel,
			@RequestParam(value="showNonPerformingGp",required=false) Boolean showNonPerformingGp
			,HttpServletRequest request){
		return reportService.getWeeklyPdfReport(parentAreaId,areaLevel,showNonPerformingGp,request);
	}
	
	@GetMapping(value = "/weeklyOdfDeclaredPdf")
	
    public String weeklyOdfDeclaredPdf(@RequestParam("parentAreaId") int parentAreaId,HttpServletRequest request,
    		@RequestParam(value="range",required=false) String range){
		return reportService.getWeeklyOdfDeclarationStatusPdf(parentAreaId,request,range);
	}
	
	@GetMapping(value = "/weeklyOdfVerifiedPdf")
	public String weeklyOdfVerifiedPdf(@RequestParam("parentAreaId") int parentAreaId,HttpServletRequest request
			,@RequestParam(value="range",required=false) String range){
		return reportService.getWeeklyOdfVerificationStatusPdf(parentAreaId,request, range);
	}
	
	@GetMapping(value = "/weeklyGeoTagPdf")
	public String weeklyGeoTagPdf(@RequestParam("parentAreaId") int parentAreaId,
			@RequestParam(value="areaLevel",required=false) Integer areaLevel,
			@RequestParam(value="range",required=false) String range,HttpServletRequest request){
		return reportService.getWeeklyGeoTagStatusPdf(parentAreaId,areaLevel,range,request);
	}
	
	@GetMapping(value = "/weeklyConsolidatedPdf")
	public String weeklyConsolidatedPdf(@RequestParam("parentAreaId") int parentAreaId,
			@RequestParam(value="areaLevel",required=false) Integer areaLevel,HttpServletRequest request){
		return reportService.getWeeklyConsolidatedPdf(parentAreaId,areaLevel,request);
	}
	
	@GetMapping(value="/downloadDailyA03PdfReport")
	public String getPDF(@RequestParam("forAreaId")int forAreaId, @RequestParam(value="areaLevel",required=false)Integer areaLevel,@RequestParam(value="range",required=false)String range,HttpServletRequest request) {
		return formatA03DailyReportService.genDailyPDFReport(forAreaId,areaLevel,range,request);
	}
	@GetMapping(value="/getDailyPhyProgressRprt")
	public String getDailyPhyProgressRprt(@RequestParam("forAreaId")int forAreaId, @RequestParam(value="areaLevel",required=false)Integer areaLevel,@RequestParam(value="range",required=false)String range,HttpServletRequest request) {
		return formatA03DailyReportService.genDailyPhyProgressRprt(forAreaId,areaLevel,range,request);
	}
	@GetMapping(value="/getDailyIhhlCompRprt")
	public String getDailyIhhlCompRprt(@RequestParam("forAreaId")int forAreaId, @RequestParam(value="areaLevel",required=false)Integer areaLevel,@RequestParam(value="range",required=false)String range,HttpServletRequest request) {
		return formatA03DailyReportService.genDailyIhhlCompRprt(forAreaId,areaLevel,range,request);
	}
	
	@GetMapping(value="/getDailyA03")
	 public  List<Map<String,String>> getDailyData(@RequestParam("forAreaId")int forAreaId,@RequestParam(value="areaLevel",required=false)Integer areaLevel,@RequestParam(value="range",required=false)String range) {
		return formatA03DailyReportService.getDailyData(forAreaId,areaLevel,range);
	}
	@GetMapping(value="/getDailyA03Tb2")
	 public  List<Map<String,String>> getDailyDataTb2(@RequestParam("forAreaId")int forAreaId,@RequestParam(value="areaLevel",required=false)Integer areaLevel,@RequestParam(value="range",required=false)String range) {
		return formatA03DailyReportService.getDailyDataTb2(forAreaId,areaLevel,range);
	}
	@GetMapping(value = "/getDailyTracker")
	public String getDailyTracker() {
		// generate the excel file
		return dailyTrackerService.getDailyTracker();		
		
	}
}

/**
 * 
 */
package com.sbm.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sbm.domain.FormatA03;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  30-Nov-2018 11:00:42 AM
 */
public interface DailyReportFormatA03Service {

	void genDailyReport(List<FormatA03> dataDomains);
	String  genDailyPDFReport(int areaId, Integer areaLevel, String range, HttpServletRequest request);
	
	/**
	 * @param forAreaId
	 * @param range 
	 * @param areaLevel 
	 * @return
	 */
	List<Map<String, String>> getDailyData(int forAreaId, Integer areaLevel, String range);
    List<Map<String, String>> getDailyDataTb2(int forAreaId,Integer areaLevel, String range);

	/**
	 * @param forAreaId
	 * @param areaLevel
	 * @param range 
	 * @param request
	 * @return
	 */
	String genDailyPhyProgressRprt(int forAreaId, Integer areaLevel, String range, HttpServletRequest request);
	/**
	 * @param forAreaId
	 * @param areaLevel
	 * @param range 
	 * @param request
	 * @return
	 */
	String genDailyIhhlCompRprt(int forAreaId, Integer areaLevel, String range, HttpServletRequest request);
}

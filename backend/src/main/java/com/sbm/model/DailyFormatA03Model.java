/**
 * 
 */
package com.sbm.model;

import lombok.Data;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  04-Dec-2018 6:03:10 PM
 */
@Data
public class DailyFormatA03Model {

	private Integer areaLevelId;
	
	private Integer areaId;
	
	private String areaName;
	
	private Integer parentAreaId;
	
	//column 3 of website  Total No. of IHHLs to be Constructed

	private Integer detailsWithOrWithoutToilet;
	
	//column 20 of website Total IHHLs Constructed
	
	private Integer coverageHHIncludingBLS;
	//column 21 of website Remaining IHHLs to be Constructed

	private Integer coverageHHBalanceUncovered;
	//column 22 of website Coverage%age
	
	private Double ihhlCoveragePercent;
	
}

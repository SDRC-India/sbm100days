/**
 * 
 */
package com.sbm.model;

import java.util.Date;

import lombok.Data;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  06-Dec-2018 1:04:38 PM
 */
@Data
public class DailyTrackerModel {

	private String distName;
	private Date targetOdfDate;
	private  Integer balRemainOnDEC1;
	private Float covPercentage;
	private Integer daysLeftToBeODF;
	private Integer totalTargetAchivedTillDay;
	private Float targetPerAchieved;
	private Integer currRateOfCons;
	private Integer reqdRateOfCons;
	private Integer balToAchieveTarget;
	
}

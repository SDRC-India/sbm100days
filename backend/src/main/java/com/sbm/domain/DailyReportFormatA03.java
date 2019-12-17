/**
 * 
 */
package com.sbm.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  30-Nov-2018 10:36:25 AM
 */
@Data
@Entity
@Table(name="daily_report_A03")
public class DailyReportFormatA03 {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer reportId;
	
	@CreationTimestamp
	private Date createdDate;
	
	private Integer areaLevelId;
	
	private Integer areaId;
	
	private String areaName;
	
	private Integer parentAreaId;
	
	//column 3 of website  Total No. of IHHLs to be Constructed
	@Column(name="total_ihhl_to_be_constructed")
	private Integer detailsWithOrWithoutToilet;
	
	//column 20 of website Total IHHLs Constructed
	@Column(name="total_ihhl_constructed")
	private Integer coverageHHIncludingBLS;
	//column 21 of website Remaining IHHLs to be Constructed
	@Column(name="remaining_Ihhl_to_be_constructed")
	private Integer coverageHHBalanceUncovered;
	//column 22 of website Coverage%age
	@Column(name="coverage_percent")
	private Double ihhlCoveragePercent;
	
	
}

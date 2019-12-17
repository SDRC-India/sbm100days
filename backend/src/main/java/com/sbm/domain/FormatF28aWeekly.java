package com.sbm.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_f28a_weekly")
@Data
public class FormatF28aWeekly 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	private String areaName;
	private Integer sbmAreaId;
	private Integer parentSbmAreaId;        
	private Date createdDate;
	private Date improvmentSinceDate;
	
	private Double previousWeekCoveragePercent;
	private Double currentWeekCoveragePercent;
	private BigDecimal improvement;
	private Integer balanceRemaining;//web page col4-col7
	
	
}

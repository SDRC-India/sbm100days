/**
 * 
 */
package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 26-Dec-2018 5:08:48
 *         PM
 */
@Entity
@Table(name = "Format_ER89")
@Data
public class FormatER89 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// @Column(name = "data_id")
	private Long id;

	private String areaName;

	private Integer areaLevelId;

	private Integer sbmAreaId;
	
	private Integer parentAreaId;
	
	private String financialYear;

	private Integer physicalIecTarget;

	private Integer physicalIecAchievement;

	private Integer physicalHrdTarget;

	private Integer physicalHrdAchievement;

	private Double finOpeningBal;

	private Double finRelease;

	private Double finTotal;

	private Double finTotalExpAll;

	private Double finIecExp;

	private Double finHrdExp;

	private Double finTotalIecHrd;

	private Double finPerIecExp;

	private Date createdDate;

}

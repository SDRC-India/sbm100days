package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "district_ranking")
public class DistrictRanking 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Date createdDate;
	private Date previousWeekCreatedDate;
	private String districtName;
	private Integer areaLevelId;
	private Integer sbmAreaId;
	private Integer parentSbmAreaId;
	private Double ihhlCoverage;
	private Integer spreadOfCoverage;
	private Double rateOfConstruction;
	private Double performanceScore;
	private Double declarationOfOdfVillages;
	private Double verificationOfOdfVillages;
	private Double geotaggingsOfIhhls;
	private Double transparencyScore;
	private Double iecExpenditure;
	private Integer swachhagrahis;
	private Double sustainabilityScore;
	private Double totalScore;
	private Integer currentWeekRanking;
	private Integer previousWeekRanking;
	private Integer changeInRanking;



}

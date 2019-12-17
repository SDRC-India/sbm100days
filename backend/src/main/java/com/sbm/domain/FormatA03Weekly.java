package com.sbm.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_a03_weekly")
@Data
public class FormatA03Weekly implements Serializable 
{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	private String stateName;
	private String districtName;
	private String blockName;
	private String gpName;
	private Integer coverageHHIncludingBLS;
	private Integer coverageHHBalanceUncovered;
	private Double ihhlCoveragePercent;
    private Integer areaLevelId;
	private Integer areaId;
	private Integer parentAreaId;
	private Date createdDate;
	private Date improvmentSinceDate;
	private Integer improvment;
	private Integer constructionForWeekRR;
	private Double progressPercent;
	private Integer hhDetailsWithToilet;
	private Integer coverageHH1415;
	private Integer coverageHH1516;
	private Integer coverageHH1617;
	private Integer coverageHH1718;
	private Integer coverageHH1819;
	

}

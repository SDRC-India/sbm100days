package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_a03")
@Data
public class FormatA03 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	//@Column(name = "data_id")
	private Long id;
	
	private String stateName;
	//@Column(name = "col1")
	private String districtName;//district
	//@Column(name = "col2")
	private String blockName;//block
	//@Column(name = "col3")
	private String gpName;//gp
	//@Column(name = "col4")
	private Integer detailsWithOrWithoutToilet;
	//@Column(name = "col5")
	private Integer hhDetailsWithToilet;
	//@Column(name = "col6")
	private Integer bplNotHavingToilet;
	//@Column(name = "col7")
	private Integer identifiedAplNotHavingToilet;
	//@Column(name = "col8")
	private Integer unidentifiedAplNotHavingToilet;
	//@Column(name = "col9")
	private Integer totalAplNotHavingToilet;
	//@Column(name = "col10")
	private Integer totalBplAplNotHavingToilet;
	//@Column(name = "col11")
	private Integer totalHHIdentifiedNotHavingToilet;
	
	//@Column(name = "col12")
	private Integer coverageHH1314Reported;//district
	//@Column(name = "col13")
	private Integer coverage1314OutOfHHEntered;//district
	//@Column(name = "col14")
	private Integer coverage1314HHEntered;//block and gp
	//@Column(name = "col15")
	private Integer coverageHHDistrictWise1314;//district
	
	//@Column(name = "col16")
	private Integer coverageHH1415;
	//@Column(name = "col17")
	private Integer coverageHH1516;
	//@Column(name = "col18")
	private Integer coverageHH1617;
	//@Column(name = "col19")
	private Integer coverageHH1718;
	//@Column(name = "col20")
	private Integer coverageHH1819;
	//@Column(name = "col21")
	private Integer coverageHHCommunityOtherToilet;
	//@Column(name = "col22")
	private Integer coverageHHAfterBLS;
	//@Column(name = "col23")
	private Integer coverageHHIncludingBLS;
	//@Column(name = "col24")
	private Integer coverageHHBalanceUncovered;//
	//@Column(name = "col25")
	
	private Double hhCoveredInLOB;
	
	private Double ihhlCoveragePercent;
	
	private Double coverageHHBalanceUncoveredPercent;
	
	private Integer areaLevelId;
	
	private Integer areaId;
	
	private Date createdDate;
	
	private Double balanceUncoveredRR;
	
	private Integer hHCoveragedYesterday;
	
	private Integer deficit;
	
	private Integer coverageHH1920;
	
	private Integer totalDetailEnteredLob;
	
	private Integer detailsWithOrWithoutToiletLob;
	
	private Integer coverageHHLobBls;
	
}

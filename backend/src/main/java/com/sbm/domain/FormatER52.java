package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_er52")
@Data
public class FormatER52 {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	private String financialYear;
	
	private Integer sbmAreaId;
	
	private Date createdDate;
	
	private Integer parentSbmAreaId;
	
	private String areaName;
	
	private Integer totalToiletConstructed;
	
	private Integer twinToilet;
	
	private Integer singleToilet;
	
	private Integer septicToilet;
	
	private Integer biogasToilet;
	
	private Integer bioToilet;
	
	private Integer ecologicalSanitationToilet;
	
	private Integer divyangFriendlyToiletHHTotal;
			
	private Integer divyangFriendlyToiletHHAPL;
					
	private Integer divyangFriendlyToiletHHBPL;
			
	private Integer divyangFriendlySanitaryComplex;

}

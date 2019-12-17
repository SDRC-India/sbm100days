package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_f42_weekly")
@Data
public class FormatF42Weekly 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	private String areaName;
	private Integer odfDeclaredTotalVillages;
	private Integer odfDeclaredVillagesOnCurrentWeek;
	private Integer odfDeclaredVillagesOnPreviousWeek;
	
	private Integer areaId;
	private Integer parentAreaId;        
	private Date createdDate;
	private Date improvmentSinceDate;
	
	
	private Double odfDeclaredVillagesPercentage;
	
	private Integer verifiedOdfDeclaredTotalVillages;
	private Integer verifiedOdfDeclaredVillagesOnCurrentWeek;
	private Integer verifiedOdfDeclaredVillagesOnPreviousWeek;
	
	private Integer verifiedOdfDeclaredVillagesimprovment;
	private Integer odfDeclaredVillagesimprovment;
	private Double verifiedOdfDeclaredVillagesPercentage;
	
	private Integer gpDeclaredOdf;
	private Integer blockDeclaredOdf;
	private Integer blockTotal; 
	
	
}

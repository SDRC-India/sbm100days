package com.sbm.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_f42_district")
@Data
public class FormatF42District {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "form_district_id")
	private Integer formDistrictId;
	
	private String blockName;
	
	private Integer gpTotal;
	private Integer gpDeclaredOdf;
	private Integer gpVerifiedOdf;
	private Integer gpNotDeclaredOdf;
	
	private Integer villageTotal;
	private Integer villageNotExist;
	
	private Integer villageDeclaredOdf1516;
	private Integer villageDeclaredOdf1617;
	private Integer villageDeclaredOdf1718;
	private Integer villageDeclaredOdf1819;
	private Integer villageDeclaredOdfTotal;
	
	private Integer villageVerifiedOdf1516;
	private Integer villageVerifiedOdf1617;
	private Integer villageVerifiedOdf1718;
	private Integer villageVerifiedOdf1819;
	private Integer villageVerifiedOdfTotal;
	
	private Integer villageNotDeclaredOdf;
	private Integer villageNotVerifiedOdf;
	
	private Integer verifiedOdfSecondLevel;
	
	private Integer districtId;
	private Integer blockId;
	
	private Date createdDate;
	
	private Double villageDeclaredOdfPercentage;
	private Double villageVerifiedOdfPercentage;
	
	private Integer  villageDeclaredOdfDifference;
	private Integer  villageVerifiedOdfDifference;
	
}

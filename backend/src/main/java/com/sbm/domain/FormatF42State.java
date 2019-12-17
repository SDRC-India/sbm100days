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
@Table(name="format_f42_state")
@Data
public class FormatF42State {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "form_state_id")
	private Integer formStateId;
	
	private String areaName;
	
	private Integer blockTotal;
	private Integer blockDeclaredOdf;
	private Integer blockVarifiedOdf;
	
	private Integer gpTotal;
	private Integer gpDeclaredOdf;
	private Integer gpVarifiedOdf;
	
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
	private Integer villageNotVarifiedOdf;
	
	private Integer verifiedOdfSecondLevel;
	
	private Integer stateId;
	private Integer areaId;
	
	private Date createdDate;
	
	private Double villageDeclaredOdfPercentage;
	private Double villageVerifiedOdfPercentage;
	
	private Integer  villageDeclaredOdfDifference;
	private Integer  villageVerifiedOdfDifference;
	

}

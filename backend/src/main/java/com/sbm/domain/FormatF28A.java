package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="format_f28a")
@Data
public class FormatF28A {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String areaName;
	
	private Integer sbmAreaId;
	
	private Date createdDate;
	
	private Integer parentSbmAreaId;
	
	private Integer noOfToiletsUnapproved;
	
	private Integer noOfToiletsApproved;
	
	private Integer uploadedPhotographsApproved;
	
	private Integer uploadedPhotographsUnapproved;
	
	private Integer uploadedPhotographsTotal;
	
	private Double uploadedPhotographsPercentage;
	
	private Integer uploadedPhotographsYesterday;
}

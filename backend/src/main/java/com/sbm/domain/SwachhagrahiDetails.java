package com.sbm.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name="swachhagrahi_details")
public class SwachhagrahiDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private Integer noOfSwachhagrahi;
	
	@Column
	@CreationTimestamp
	private Date createdDate;
	
	private Integer sbmAreaId;
	
	private Integer parentSbmAreaId;
	
	private String areaName;
	
	private Integer totalNoOfGps;
	
	private Integer totalNoOfGPEnteredSwachhagrahiDetails;
	
	private Integer noOfSwachhagrahiVolunteer;
	
	private Integer noOfSwachhagrahiPaid;
	
}

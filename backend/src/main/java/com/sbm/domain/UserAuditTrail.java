package com.sbm.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
public class UserAuditTrail {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer userAuditTraild;
	
	private Integer designationId;
	
	private Integer areaId;
	
	private Integer typeDetailId;
	
	private String mobileNumber;
	
	private String name;
	
	@CreationTimestamp
	private Date date;
	
	private Integer accountId;

}

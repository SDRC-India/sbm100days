package com.sbm.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

/**
 * 
 * @author subrata
 *
 *	This table contains message details(message template with data) 
 *	with user details and requestId from the response.
 */
@Data
@Entity
@Table(name="sms_details")
public class SMSDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="sms_details_id_pk")
	private Integer smsDetailsId;
	
	@Column(length = 500)
	private String smsDetails;
	
	@CreationTimestamp
	private Date creationDate;
	
	@ManyToOne
	@JoinColumn(name="user_id_fk")
	private UserDetails userDetails;
	
	@Column(name="request_id")
	private String requestId;

	@Column(name="status")
	private String statusCode;
}

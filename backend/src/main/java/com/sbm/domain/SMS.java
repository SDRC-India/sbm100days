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

@Data
@Entity
@Table(name = "sms")
public class SMS {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="sms_id_pk")
	private Integer id;
	
	@Column(length = 700)
	private String message;
	
	@CreationTimestamp
	private Date createdDate;
	
	@ManyToOne
	@JoinColumn(name="user_id_fk")
	private UserDetails userDetails;

	@Column(name="status")
	private boolean status;
	
	@Column(name="area_level_id")
	private Integer areaLevelId;
	
	@Column(name="updated_date")
	private Date updatedDate;

}

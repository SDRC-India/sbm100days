package com.sbm.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.sdrc.usermgmt.domain.Account;

import lombok.Data;


@Data
@Entity
@Table(name="mst_user_area_mapping")
public class UserAreaMapping implements Serializable {

	private static final long serialVersionUID = 6113675115906477926L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_area_mapping_id")
	private Integer userAreaMappingId;
	
	@Column(name="created_date")
	private Timestamp createdDate;
	
	@ManyToOne
	@JoinColumn(name="area_id_fk")
	private Area area;
		
	@ManyToOne
	@JoinColumn(name="acc_id_fk")
	private Account user;
	
}

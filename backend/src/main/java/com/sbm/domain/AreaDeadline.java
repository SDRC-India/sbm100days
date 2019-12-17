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

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;

/**
 * 
 * @author subrata
 *	Contains the deadline date for all area.
 */

@Data
@Entity
@Table(name="mst_area_deadline")
public class AreaDeadline{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column(name="deadline", nullable = false)
	private Date deadline;
	
	@Column(name="sendSMS", nullable = false)
	private boolean shouldSendSMS;
	
	@Column
	@CreatedDate
	private Date createdDate;
	
	@ManyToOne
	@JoinColumn(name="area_id_fk")
	private Area areaId;
	
	@Column(name="isDeadLineActive")
	private boolean isDeadLineActive;
}

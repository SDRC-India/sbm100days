package com.sbm.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import lombok.Data;

/**
 * 
 * @author subrata
 *	
 *	Contains all the message template details for all area level.
 */
@Data
@Entity
@Table(name="mst_message_template")
public class MessageTemplate {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="msg_id")
	private Integer msgId;
	
	@ManyToOne
	@JoinColumn(name="area_level_id_fk")
	private AreaLevel areaLevel;
	
	@Column
	@CreatedDate
	private Date createdDate;
	
	@Column
	private String msgTemplate;
	
	@Column
	private boolean isActive;
	
	@Column
	private Date updatedDate;
	
	@OneToOne
	@JoinColumn(name="type_details_id_fk")
	private TypeDetails typeDetails;
	
}

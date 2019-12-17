/**
 * 
 */
package com.sbm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * @author RajaniKanta(rajanikanta@sdrc.co.in)
 *
 */
@Entity
@Data
public class Attachment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "attachment_id")
	private Long attachmentId;

	@Column(name = "file_path")
	private String filePath;

	@Column(name = "is_deleted")
	private Boolean isDeleted;

	@Column(name = "original_Name")
	private String originalName;
	
	@Column(name="column_name")
	private String columnName;
	
//	@ManyToOne
//	@JsonIgnore
//	@JoinColumn(name="inmate_submission_id_fk")
//	private InmatesData inmateData;
//	
//
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name="submission_id_fk")
	private SubmitionData submitionData;


	
	

}

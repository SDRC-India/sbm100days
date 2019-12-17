package com.sbm.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

/**
 * 
 * @author Subrata
 * 
 */
@Data
@Entity
@Table(name="mst_type_details")
public class TypeDetails implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="type_detail_id_pk")
	private Integer typeDetailId;
	
	@Column(name = "type_detail_name", length = 150)
	private String typeDetailName;
	
	@Column(name="description", length = 150)
	private String description;
	
	@Column(name = "created_by", length = 60)
	private String createdBy;
	
	@Column(name = "created_date")
	private Date createdDate;
	
	@ManyToOne
	@JoinColumn(name="type_id_fk")
	private Type type;
	
	public TypeDetails() {
		super();
	}

	public TypeDetails(int i) {
		this.typeDetailId = i;
	}

	public Integer getTypeDetailId() {
		return typeDetailId;
	}

	public void setTypeDetailId(Integer typeDetailId) {
		this.typeDetailId = typeDetailId;
	}

	public String getTypeDetailName() {
		return typeDetailName;
	}

	public void setTypeDetailName(String typeDetailName) {
		this.typeDetailName = typeDetailName;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Type getUserType() {
		return type;
	}

	public void setUserType(Type type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}

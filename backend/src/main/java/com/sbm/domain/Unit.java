package com.sbm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="unit")
public class Unit 
{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="unit_id")
	private Integer id;
	
	@Column(name="unit_name", nullable = false)
	private String unitName;
}

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
@Table(name="indicator")
public class Indicator 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="indicator_id")
	private Integer id;
	
	@Column(name="indicator_name", nullable = false)
	private String indicatorName;
}

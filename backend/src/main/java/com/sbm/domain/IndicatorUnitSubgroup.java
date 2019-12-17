package com.sbm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="indicator_unit_subgroup_mapping")
public class IndicatorUnitSubgroup 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="indicator_id_fk")
	private Indicator indicator;
	
	@ManyToOne
	@JoinColumn(name="unit_id_fk")
	private Unit unit;
	
	@ManyToOne
	@JoinColumn(name="subgroup_id_fk")
	private SubGroup subGroup;
}

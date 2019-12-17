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
@Table(name="sub_group")
public class SubGroup
{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="sub_group_id")
	private Integer id;
	
	@Column(name="sub_group_name", nullable = false)
	private String subGroupName;
}

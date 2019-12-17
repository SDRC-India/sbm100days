package com.sbm.domain;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="ihhl_raw_materials_requirement")
@Data
public class IhhlRawMaterialsRequirement 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String particulars;
	private String unit;
	private String quantity;
}

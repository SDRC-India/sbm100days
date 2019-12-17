package com.sbm.domain;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * @author Maninee Mahapatra Created date 11-09-2018 This Entity class will keep
 *         all the indicator for water report template
 * 
 * @since version 1.0.0.0
 *
 */
@Entity
@Table(name = "water_indicator")
@Data
public class WaterIndicator implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Sl_No")
	private Integer serielno;

	@Column(name = "created_date")
	private Timestamp createdDate;

	@Column(name = "Name_of_the_District ")
	private String nameOfTheDistrict;

	@Column(name = "Division")
	private String division;

	@Column(name = "Block")
	private String block;

	@Column(name = "No_of_GPHQs")
	private Integer noOfGPHQs;

	@Column(name = "Source_Sanctioned")
	private Integer sourceSanctioned;

	@Column(name = "Source_not_done", nullable = false)
	private Integer sourceNotDone;

	@Column(name = "DPR_not_submitted")
	private Integer dprNotSubmitted;

	@Column(name = "PWS_Sanctioned")
	private Integer pwsSanctioned;

	@Column(name = "Tendering_not_done")
	private Integer tenderingNotDone;

	@Column(name = "Workorder_not_issued")
	private Integer workorderNotIssued;

	@Column(name = "Not_Completed")
	private Integer notCompleted;

	@Column(name = "second_Village_Source_sanctioned")
	private Integer secondndVillageSourceSanctioned;

	@Column(name = "Not_Done")
	private Integer notDone;

	@Column(name = "block_id")
	private Integer blockId;
	
	@Column(name = "district_id")
	private Integer districtId;
	
	@Column(name = "area_level_id")
	private Integer areaLevelId;
	
	

}

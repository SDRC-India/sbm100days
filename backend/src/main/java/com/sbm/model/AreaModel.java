package com.sbm.model;

import lombok.Data;

/**
 * @author subham
 *
 */
@Data
public class AreaModel {
	
	private Integer areaId;

	private String areaName;

	private int parentAreaId;

	private String areaLevel;

	private boolean isLive;

	private String areaCode;
	
	private Integer sbmAreaId;

}

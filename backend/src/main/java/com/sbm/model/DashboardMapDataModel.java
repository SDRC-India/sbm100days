package com.sbm.model;



import java.io.Serializable;

import lombok.Data;

@Data
public class DashboardMapDataModel implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer sbmAreaId;
	private String areaCode;
	private String areaName;
	private Double value;
	private Integer number;
	private String cssClass;
	private Integer areaLevelId;
}

package com.sbm.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class DashboardDailyTrendDataModel implements Serializable {

	private static final long serialVersionUID = 1L;
	String key;
	String date;
	Integer value;
	String name;
	Integer areaLevelId;
}

package com.sbm.model;

import lombok.Data;

@Data
public class UserDetailsModel {

	private Integer userId;

	private String userName;

	private Integer areaId;

	private String areaName;

	private Integer sbmAreaId;
	
	private Boolean enable;
	
	private String name;
	
	private String mobileNumber;
	
	private Integer typeDetailsId;
	
	private Integer roleId;
}

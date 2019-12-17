package com.sbm.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class QuickStartModel implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private double coverage;
	
	private double geoTagging;
	
	private Integer odfDeclaredVillage;
	
	private Integer noOfSwachhagrahi;
}

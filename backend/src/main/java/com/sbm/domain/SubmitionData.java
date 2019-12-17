package com.sbm.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;
import org.sdrc.usermgmt.domain.Account;
import org.springframework.data.annotation.CreatedBy;



import lombok.Data;


@Data
@Entity
@Table(name = "mst_submition_data")
public class SubmitionData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int submitionId;
	
	@ManyToOne
	@JoinColumn(name = "q1")
	private Area q1;
	
	@ManyToOne
	@JoinColumn(name = "q2")
	private Area q2;
	
	@ManyToOne
	@JoinColumn(name = "q3")
	private Area q3;
	
	@ManyToOne
	@JoinColumn(name = "q4")
	private Area q4;
	
	@ManyToOne
	@JoinColumn(name = "q5")
	private Options q5;
	
	String q6;
	
	String q7;
	
	String q8;
	
	
	
	@ManyToOne
	@JoinColumn(name = "q9")
	private Options q9;
	
	@ManyToOne
	@JoinColumn(name = "q10")
	private Options q10;
	
	String q11;
	
	String q12;
	
	String q13;
	
	@ManyToOne
	@JoinColumn(name = "q14")
	private Options q14;
	
	@ManyToOne
	@JoinColumn(name = "q15")
	private Options q15;
	
	@ManyToOne
	@JoinColumn(name = "q16")
	private Options q16;
	
	@ManyToOne
	@JoinColumn(name = "q17")
	private Options q17;
	
	@ManyToOne
	@JoinColumn(name = "q18")
	private Options q18;
	
	@ManyToOne
	@JoinColumn(name = "q19")
	private Options q19;
	
	@ManyToOne
	@JoinColumn(name = "q20")
	private Options q20;
	
	@ManyToOne
	@JoinColumn(name = "q21")
	private Options q21;
	
	@ManyToOne
	@JoinColumn(name = "q22")
	private Options q22;
	
	String q23;
	
	String q24;
	
	private String q25;
	
	String q26;
	
	String q27;
	
	@ManyToOne
	@JoinColumn(name = "q28")
	private Options q28;
	
	String q29;
	
	@ManyToOne
	@JoinColumn(name = "q30")
	private Options q30;
	
	String q31;
	
	String q32;
	
	String q33;
	
	@CreatedBy
	@ManyToOne
	@JoinColumn(name = "created_account_fk")
	private Account createdBy;

	@UpdateTimestamp
	private Date updatedDate;

	@ManyToOne
	@JoinColumn(name = "updated_account_fk")
	private Account updatedBy;
	
	private boolean isLive;

	private boolean isDeleted = false;
	
	@OneToMany(mappedBy = "submitionData", cascade = CascadeType.ALL)
	private List<Attachment> attachment;
}

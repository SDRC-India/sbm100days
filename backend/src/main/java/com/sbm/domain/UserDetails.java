package com.sbm.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.sdrc.usermgmt.domain.Account;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "mst_user_details")
public class UserDetails implements Serializable{

	private static final long serialVersionUID = -6142358483948073924L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_details_id")
	private Integer userDetailsId;

	@Column
	private String name;
	
	@JsonIgnore
	@OneToMany(mappedBy="user",fetch=FetchType.EAGER)
	List<UserAreaMapping> areas;
	
	@Column
	private String mobileNumber;
	
	@ManyToOne
	@JoinColumn(name = "type_detail_id_fk", nullable = false)
	private TypeDetails typeDetails;
	
	@OneToOne
	@JoinColumn(name = "acc_id_fk",unique=true)
	private Account account;
	
	public UserDetails() {
		
	}
	public UserDetails(Integer userDetailsId) {
		this.userDetailsId = userDetailsId;
	}
}

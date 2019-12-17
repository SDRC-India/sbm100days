package com.sbm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
/**
 * 
 * @author RajaniKanta(rajanikanta@sdrc.co.in)
 *
 */

@Entity
@Table(name="question_option_type_mapping")
public class QuestionOptionTypeMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @ManyToOne
    @JoinColumn(name="option_type_fk")
    private OptionType optionType;


    @OneToOne
    @JoinColumn(name="question_id_fk")
    private Question question;





	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public OptionType getOptionType() {
		return optionType;
	}


	public void setOptionType(OptionType optionType) {
		this.optionType = optionType;
	}


	public Question getQuestion() {
		return question;
	}


	public void setQuestion(Question question) {
		this.question = question;
	}

}
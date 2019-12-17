/**
 * 
 */
package com.sbm.repository;

import java.util.List;

import com.sbm.domain.OptionType;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass=OptionType.class,idClass=Integer.class)
public interface OptionTypeRepository {
	
	@Transactional
	OptionType save(OptionType ooptionType);
	
	List<OptionType> findAll();

}

/**
 * 
 */
package com.sbm.repository;

import com.sbm.domain.QuestionOptionTypeMapping;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Harsh Pratyush(harsh@sdrc.co.in)
 *
 */


@RepositoryDefinition(domainClass=QuestionOptionTypeMapping.class,idClass=Integer.class)
public interface QuestionOptionTypeMappingRepository {
	
	@Transactional
	QuestionOptionTypeMapping save(QuestionOptionTypeMapping questionOptionTypeMapping);

}

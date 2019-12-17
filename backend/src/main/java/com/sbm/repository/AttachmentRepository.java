/**
 * 
 */
package com.sbm.repository;

import com.sbm.domain.Attachment;
import com.sbm.domain.SubmitionData;

import java.util.List;

import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Harsh Pratyush
 *
 */

@RepositoryDefinition(domainClass=Attachment.class,idClass=Integer.class)
public interface AttachmentRepository {
	
	@Transactional
	Attachment save(Attachment attachment);

	Attachment findByAttachmentId(long fileId);
	
	List<Attachment> findBysubmitionData(SubmitionData submitionData);
	
	Attachment delete(Attachment attachment);
	
	List<Attachment> findBySubmitionDataIsNull();

}

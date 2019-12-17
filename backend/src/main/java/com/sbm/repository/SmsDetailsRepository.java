/**
 * 
 */
package com.sbm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sbm.domain.SMSDetails;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in)
 * Created Date :  19-Nov-2018 7:35:43 PM
 */
public interface SmsDetailsRepository extends JpaRepository<SMSDetails, Integer> {

}

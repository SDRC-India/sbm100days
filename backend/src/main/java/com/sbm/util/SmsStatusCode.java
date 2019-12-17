/**
 * 
 */
package com.sbm.util;

/**
 * @author Ashutosh Dang(ashutosh@sdrc.co.in) Created Date : 20-Nov-2018 2:29:19
 *         PM
 */
public enum SmsStatusCode {
	
	SUBMITTED("submitted"), FAIL("fail"), SUCCESS("success"), QUEUE("queue"), EXPIRED("expired");
	private final String value;

	private SmsStatusCode(String value) {
		this.value = value;
	}
	
	public final String getValue(){
		return this.value;
		} 
}

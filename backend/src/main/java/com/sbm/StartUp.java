package com.sbm;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.annotation.PostConstruct;

import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ComponentScan(basePackages = { "org.sdrc.usermgmt.core", "com.sbm" })
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EntityScan(basePackages = "com.sbm.domain")
@EnableJpaRepositories(basePackages = { "com.sbm.repository" })
@EnableTransactionManagement
@EnableCaching
@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class,MongoRepositoriesAutoConfiguration.class,MongoDataAutoConfiguration.class})
public class StartUp extends SpringBootServletInitializer {

	private final Path rootPath = Paths.get("/sbm100days");
	
	private final Path instPath = Paths.get("/sbm100days/img");
	
	public static void main(String[] args) {
		SpringApplication.run(StartUp.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(StartUp.class);
	}
	/**
	 * The PoolingHttpClientConnectionManager will create and manage a pool of connections 
	 * for each route or target host we use. The default size of the pool of concurrent connections 
	 * that can be open by the manager is 2 for each route or target host, and 20 for total open connections.
	 * @return
	 */
	
	@Bean
	public PoolingHttpClientConnectionManager poolingHttpClientConnectionManager() {
		PoolingHttpClientConnectionManager result = new PoolingHttpClientConnectionManager();
		result.setMaxTotal(50);
		return result;
	}

	/**
	 * socketTimeout() (or SO_TIMEOUT) refers to the timeout for waiting for data,  
	 * connectTimeout() refers to the timeout until a connection is established and  
	 * connectionRequestTimeout() refers to the timeout when requesting a connection from the connection manager.
	 * 
	 * @return result is a RequestConfig
	 */
	@Bean
	public RequestConfig requestConfig() {
		RequestConfig result = RequestConfig
				.custom()
				.setConnectionRequestTimeout(5000)
				.setConnectTimeout(5000)
				.setSocketTimeout(5000).build();
		return result;
	}

	@Bean
	public CloseableHttpClient httpClient(PoolingHttpClientConnectionManager poolingHttpClientConnectionManager,
			RequestConfig requestConfig) {
		CloseableHttpClient result = HttpClientBuilder
				.create()
				.setConnectionManager(poolingHttpClientConnectionManager)
				.setDefaultRequestConfig(requestConfig).build();
		return result;
	}

	@Bean
	public RestTemplate restTemplate(HttpClient httpClient) {
		HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
		requestFactory.setHttpClient(httpClient);
		return new RestTemplate(requestFactory);
	}
	
	/**
	 * These are the abstraction providing the caching logic, 
	 * but does not provide the actual storage to store the cache data.
	 */
	
    @Bean
    public CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheCacheManager().getObject());
    }
 
    @Bean
    public EhCacheManagerFactoryBean ehCacheCacheManager() {
        EhCacheManagerFactoryBean factory = new EhCacheManagerFactoryBean();
        factory.setConfigLocation(new ClassPathResource("ehcache.xml"));
        factory.setShared(true);
        return factory;
    }
    
	@PostConstruct
	public void init() {
		try {

			if(!Files.isDirectory(rootPath))
			{
			Files.createDirectory(rootPath);
			}
			
			if(!Files.isDirectory(instPath))
			{
			Files.createDirectory(instPath);
			}
			
			
		} catch (IOException e) {
		}
	}
     
}

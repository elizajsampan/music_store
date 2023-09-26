package reverbapp.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.postgresql.Driver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@ComponentScans(value = { @ComponentScan("reverbapp.dao"),
@ComponentScan("reverbapp.services") })
@MapperScan("reverbapp.mappers")
public class MyBatisConfiguration {
	
	@Bean
	public BasicDataSource dataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(Driver.class.getName());
		dataSource.setUrl("jdbc:postgresql://localhost:5432/music_store");
		dataSource.setUsername("postgres");
		dataSource.setPassword("postgres");
		return dataSource;
	}
	
	@Bean
	   public DataSourceTransactionManager transactionManager(BasicDataSource dataSource) {
	     return new DataSourceTransactionManager(dataSource);
	   }

	@Bean
	  public SqlSessionFactory sqlSessionFactory(BasicDataSource dataSource) throws Exception {
	    SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
	    factoryBean.setDataSource(dataSource);
	    return factoryBean.getObject();
	  }
}

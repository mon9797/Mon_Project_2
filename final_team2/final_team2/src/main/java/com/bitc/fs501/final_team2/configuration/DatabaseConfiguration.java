package com.bitc.fs501.final_team2.configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.beans.factory.annotation.Value;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Configuration
@PropertySource("classpath:/application.properties")
public class DatabaseConfiguration {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 요즘에는 @Autowired의 사용을 권장하지 않음
    // 대신 Lombok에서 제공하는 @RequiredArgsConstructor의 사용을 권장하고 있음
    // @RequiredArgsConstructor 사용 시 final 키워드 사용이 필수임
    // @Autowired
    // private ApplicationContext applicationContext;

    private final ApplicationContext app;


    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        return new HikariConfig();
    }

    @Bean
    public DataSource dataSource() throws Exception {
        DataSource dataSource = new HikariDataSource(hikariConfig());
        System.out.println(dataSource.toString());
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean ssfb = new SqlSessionFactoryBean();
        ssfb.setDataSource(dataSource);
        ssfb.setMapperLocations(app.getResources("classpath:/sql/**/sql-*.xml"));
        ssfb.setConfiguration(mybatisConfig());

        return ssfb.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory ssf) {
        return new SqlSessionTemplate(ssf);
    }

    @Bean
    @ConfigurationProperties(prefix = "mybatis.configuration")
    public org.apache.ibatis.session.Configuration mybatisConfig() {
        return new org.apache.ibatis.session.Configuration();
    }
}

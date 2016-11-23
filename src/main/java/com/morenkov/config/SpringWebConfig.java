package com.morenkov.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.CustomizableThreadFactory;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

/**
 * Equivalent for spring-web-config.xml
 *
 * @author emorenkov
 */
@Configuration
@EnableAsync
public class SpringWebConfig extends WebMvcConfigurerAdapter implements AsyncConfigurer {
    private static final Logger log = LogManager.getLogger(SpringWebConfig.class);

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
        localeChangeInterceptor.setParamName("lang");
        registry.addInterceptor(localeChangeInterceptor).addPathPatterns("/**");
    }

    @Override
    public Executor getAsyncExecutor() {
        ThreadFactory threadFactory = new CustomizableThreadFactory("async-");
        return Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors(), threadFactory);
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (ex, method, params) -> log.error("Uncaught async error", ex);
    }

    @Bean(name = "localeResolver")
    LocaleResolver localeResolver() {
        return new SessionLocaleResolver();
    }
}

package com.king.kingboard.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@EnableAspectJAutoProxy

@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    private final ObjectMapper objectMapper;


    public LoggingAspect(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Pointcut("execution(public * com.king.kingboard.controller..*.*(..))")
    public void webLog() {}


    @Before("webLog()")
    public void beforeControllerMethod(JoinPoint joinPoint) {
        ServletRequestAttributes attributes = (ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes();
        assert attributes != null;
        HttpServletRequest request = attributes.getRequest();
        try {
            var objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
            logger.info("request start----|IP:{}|URL：{}|header:{}|param:{}", request.getRemoteAddr(),
                    request.getRequestURL().toString(),
                    objectWriter.writeValueAsString(this.getHeader(request)), objectWriter.writeValueAsString(this.getRequestParams(joinPoint)));
        } catch (Exception e) {
            logger.info("exception when logging request:", e);
        }
    }
    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        Object result = proceedingJoinPoint.proceed();
        stopWatch.stop();
        try {
            var objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
            logger.info("response end----|result:{}|elapsedTime:{}", objectWriter.writeValueAsString(result), stopWatch.getTotalTimeMillis());
        } catch (Exception e) {
            logger.info("exception when logging response:", e);
        }
        return result;
    }
    private Map<String, Object> getRequestParams(JoinPoint joinPoint) {
        Map<String, Object> requestParams = new HashMap<>();
        String[] paramNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
        Object[] paramValues = joinPoint.getArgs();
        for (int i = 0; i < paramNames.length; i++) {
            Object value = paramValues[i];
            if (value instanceof MultipartFile file) {
                value = file.getOriginalFilename();
            }
            requestParams.put(paramNames[i], value);
        }
        return requestParams;
    }

    private Map<String, Object> getHeader(HttpServletRequest request) {
        Map<String, Object> headerParams = new HashMap<>();
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            headerParams.put(headerName, headerValue);
        }
        return headerParams;
    }
}

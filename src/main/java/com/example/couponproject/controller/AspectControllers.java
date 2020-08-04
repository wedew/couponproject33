package com.example.couponproject.controller;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Aspect
public class AspectControllers {

    private Map<String, OurSession> clientSessions;

    public AspectControllers(Map<String, OurSession> clientSessions) {
        this.clientSessions = clientSessions;
    }

    @Around("execution(* com.example.couponproject.controller.AdminController.*(..) )")
    public ResponseEntity<?> runBeforeAdmin(ProceedingJoinPoint point) throws Throwable {
        return getResponseEntity(point);
    }

    @Around("execution(* com.example.couponproject.controller.CompanyController.*(..))")
    public ResponseEntity<?> runBeforeCompany(ProceedingJoinPoint point) throws Throwable {
        return getResponseEntity(point);
    }

    @Around("execution(* com.example.couponproject.controller.CustomerController.*(..))")
    public ResponseEntity<?> runBeforeCustomer(ProceedingJoinPoint point) throws Throwable {
        return getResponseEntity(point);
    }

    private ResponseEntity<?> getResponseEntity(ProceedingJoinPoint point) throws Throwable {
        String token = (String) point.getArgs()[0];
        OurSession session = clientSessions.get(token);
        if (session != null) {
            if (System.currentTimeMillis() - session.getLastAccessed() > 1000 * 60 * 30){
                clientSessions.remove(token);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
            }
            session.setLastAccessed(System.currentTimeMillis());
            return (ResponseEntity<?>)point.proceed();
        }else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
    }


}

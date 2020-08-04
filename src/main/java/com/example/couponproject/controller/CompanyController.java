package com.example.couponproject.controller;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.exceptions.CannotAddCouponInSameTitleException;
import com.example.couponproject.exceptions.CannotChangeCompanyIdOrAnCouponId;
import com.example.couponproject.facade.CompanyFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("companies")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

    private Map<String, OurSession> clientSessions;

    public CompanyController(Map<String, OurSession> clientSessions) {
        this.clientSessions = clientSessions;
    }

    @GetMapping("{token}")
    public ResponseEntity<?> getCompanyDetails(@PathVariable String token) {
        OurSession session = clientSessions.get(token);
        if(session.getFacade() instanceof CompanyFacade)
            return ResponseEntity.ok(((CompanyFacade)session.getFacade()).getCompanyDetails());
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
    }

    @PostMapping("{token}")
    public ResponseEntity<?> addCoupon(@PathVariable String token, @RequestBody Coupon coupon) {
        OurSession session = clientSessions.get(token);
            try {
                ((CompanyFacade)session.getFacade()).addCoupon(coupon);
                return ResponseEntity.ok(coupon);
            } catch (CannotAddCouponInSameTitleException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
    }

    @PostMapping("update/{token}")
    public ResponseEntity<?> updateCoupon(@PathVariable String token, @RequestBody Coupon coupon) {
        OurSession session = clientSessions.get(token);
            try {
                ((CompanyFacade)session.getFacade()).updateCoupon(coupon);
                return ResponseEntity.ok(coupon);
            } catch (CannotChangeCompanyIdOrAnCouponId e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
    }

    @DeleteMapping("{token}/{couponId}")
    public ResponseEntity<String> deleteCoupon(@PathVariable String token, @PathVariable long couponId) {
        OurSession session = clientSessions.get(token);
        ((CompanyFacade)session.getFacade()).deleteCoupon(couponId);
            return ResponseEntity.ok("coupon id: " + couponId + " deleted!");
    }

    @GetMapping("allCoupons/{token}")
    public ResponseEntity<?> getAllCoupons(@PathVariable String token){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CompanyFacade)session.getFacade()).getAllCoupons());
    }

    @GetMapping("allCouponsByCategory/{token}/{categoryType}")
    public ResponseEntity<?> getAllCouponsByCategory(@PathVariable String token, @PathVariable CategoryType categoryType){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CompanyFacade)session.getFacade()).getAllCoupons(categoryType));
    }

    @GetMapping("allCouponsByMaxPrice/{token}/{maxPrice}")
    public ResponseEntity<?> getAllCouponsByMaxPrice(@PathVariable String token, @PathVariable long maxPrice){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CompanyFacade)session.getFacade()).getAllCoupons(maxPrice));
    }


}

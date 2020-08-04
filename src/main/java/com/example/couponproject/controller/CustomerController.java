package com.example.couponproject.controller;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.exceptions.*;
import com.example.couponproject.facade.CustomerFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {


    private Map<String, OurSession> clientSessions;

    public CustomerController(Map<String, OurSession> clientSessions) {
        this.clientSessions = clientSessions;
    }

    @PostMapping("purchase/{token}")
    public ResponseEntity<?> purchaseCoupon(@PathVariable String token, @RequestBody Coupon coupon){
        OurSession session = clientSessions.get(token);
            try {
                ((CustomerFacade)session.getFacade()).purchaseCoupon(coupon);
                return ResponseEntity.ok(coupon);
            } catch (emailOrAnPasswordAreIncorrectException | CustomerAlreadyBoughtThatCouponException | AmountOfCouponIsZeroException | CouponExpiredException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
    }

    @GetMapping("oneCoupon/{token}/{couponId}")
    public ResponseEntity<?> getOneCoupon(@PathVariable String token, @PathVariable long couponId){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getOneCoupon(couponId));

    }

    @GetMapping("Coupons/{token}")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable String token){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getCustomerCoupons());
    }

    @GetMapping("CouponsByType/{token}/{categoryType}")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable String token, @PathVariable CategoryType categoryType){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getCustomerCoupons(categoryType));

    }

    @GetMapping("Coupons/{token}/{maxPrice}")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable String token, @PathVariable long maxPrice){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getCustomerCoupons(maxPrice));
    }

    @GetMapping("{token}")
    public ResponseEntity<?> getCustomerDetails(@PathVariable String token){
        OurSession session = clientSessions.get(token);
        if(session.getFacade() instanceof CustomerFacade)
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getCustomerDetails());
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
    }

    @GetMapping("allCoupons/{token}")
    public ResponseEntity<?> getAllCoupons(@PathVariable String token){
        OurSession session = clientSessions.get(token);
            return ResponseEntity.ok(((CustomerFacade)session.getFacade()).getAllCoupons());
    }

    @GetMapping("companyName/{token}/{couponId}")
    public ResponseEntity<?> companyNameByCoupon(@PathVariable String token ,@PathVariable long couponId){
        OurSession session = clientSessions.get(token);
            try {
                return ResponseEntity.ok(((CustomerFacade)session.getFacade()).companyNameByCouponId(couponId));
            } catch (CouponDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
    }

}

package com.example.couponproject.controller;

import com.example.couponproject.beans.ClientType;
import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.exceptions.CouponDoesNotExistsException;
import com.example.couponproject.exceptions.emailOrAnPasswordAreIncorrectException;
import com.example.couponproject.facade.AdminFacade;
import com.example.couponproject.facade.ClientFacade;
import com.example.couponproject.facade.CompanyFacade;
import com.example.couponproject.facade.CustomerFacade;
import com.example.couponproject.login.LoginManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    private LoginManager loginManager;
    private Map<String, OurSession> clientSessions;
    private CustomerFacade customerFacade;

    public LoginController(LoginManager loginManager, Map<String, OurSession> clientSessions, CustomerFacade customerFacade) {
        this.loginManager = loginManager;
        this.clientSessions = clientSessions;
        this.customerFacade = customerFacade;
    }

    @PostMapping("login/{email}/{password}/{clientType}")
    public ResponseEntity<String> Login(@PathVariable String email, @PathVariable String password, @PathVariable ClientType clientType) {
        try {
            String token = UUID.randomUUID().toString();
            clientSessions.put(token, new OurSession(loginManager.login(
                    email, password, clientType), System.currentTimeMillis()));
            return ResponseEntity.ok(token);
        } catch (emailOrAnPasswordAreIncorrectException | SQLException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("logout/{token}")
    public ResponseEntity<String> logout(@PathVariable String token) {
        clientSessions.remove(token);
        return ResponseEntity.ok("logged out");
    }

    @GetMapping("check/{token}")
    public ResponseEntity<?> identityCheck(@PathVariable String token) {
        OurSession session = clientSessions.get(token);
        if(session == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthorized login!");
        if (session.getFacade() instanceof AdminFacade)
            return ResponseEntity.ok("admin");
        else if (session.getFacade() instanceof CompanyFacade)
            return ResponseEntity.ok("company");
        else if (session.getFacade() instanceof CustomerFacade)
            return ResponseEntity.ok("customer");
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("unauthorized login!");
    }

    @GetMapping("allCoupons")
    public List<Coupon> getAllCoupons() {
        return customerFacade.getAllCoupons();
    }

    @GetMapping("oneCoupon/{couponId}")
    public ResponseEntity<Coupon> getOneCoupon(@PathVariable long couponId){
        return ResponseEntity.ok(customerFacade.getOneCoupon(couponId));
    }

    @GetMapping("companyName/{couponId}")
    public ResponseEntity<String> companyName(@PathVariable long couponId){
        try {
            return ResponseEntity.ok(customerFacade.companyNameByCouponId(couponId));
        } catch (CouponDoesNotExistsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}

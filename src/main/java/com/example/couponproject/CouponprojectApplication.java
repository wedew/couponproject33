package com.example.couponproject;

import com.example.couponproject.Tests.Test;
import com.example.couponproject.beans.ClientType;
import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.beans.Customer;
import com.example.couponproject.exceptions.emailOrAnPasswordAreIncorrectException;
import com.example.couponproject.threads.CouponExpirationDailyJob;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLException;

@SpringBootApplication
public class CouponprojectApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx =  SpringApplication.run(CouponprojectApplication.class, args);


        Test test = ctx.getBean(Test.class);
        CouponExpirationDailyJob dailyJob = ctx.getBean(CouponExpirationDailyJob.class);
        Thread thread = new Thread(dailyJob);
        System.out.println("*************************************************************************************");

        thread.start();

//        try {
//
//            test.testAll();
//
//        } catch (emailOrAnPasswordAreIncorrectException | SQLException e) {
//            System.out.println(e.getMessage());
//        }

//        dailyJob.stopAll();
//        thread.interrupt();

        System.out.println("*************************************************************************************");



//        RestTemplate request = new RestTemplate();

//        Customer c = new Customer("emily","rosen", "emily@gmail.com", "123456");
//        Company co = new Company("agadir", "agadir@gmail.com", "123456");
//        ResponseEntity<String> token = request.postForEntity("http://localhost:8080/login/agadir@gmail.com/123456/Company", null,String.class);
//        System.out.println(token.getBody());


        // GET ONE BY ID
//			ResponseEntity<Coupon> byId = request.getForEntity("http://localhost:8080/customers/oneCoupon/" + token.getBody() + "/12", Coupon.class);
//        System.out.println(byId.getBody());

//        ResponseEntity<?> deleteById = request.exchange("http://localhost:8080/companies/" + token.getBody() + "/8",null,String.class);

//http://localhost:8080/customers/purchase/token
//         ADD PLAYER
//            Coupon coupon = byId.getBody();
//			ResponseEntity<Coupon> result = request.postForEntity("http://localhost:8080/customers/purchase/" + token.getBody(),coupon, Coupon.class);
//			System.out.println(result.getBody());

    }




}

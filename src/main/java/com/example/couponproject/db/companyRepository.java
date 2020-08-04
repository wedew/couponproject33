package com.example.couponproject.db;

import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface companyRepository extends JpaRepository<Company,Long> {
    Company findByEmailAndPassword(String email,String password);

    Company getByCoupons(Coupon coupon);
}

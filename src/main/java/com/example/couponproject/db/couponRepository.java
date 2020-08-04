package com.example.couponproject.db;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface couponRepository extends JpaRepository<Coupon,Long> {


    Coupon findByTitleAndCompany(String title, Company company);
    Coupon findByCompanyAndId(Company company, long couponId);
    List<Coupon> findByCompany(Company company);
    List<Coupon> findByCompanyAndCategory(Company company, CategoryType categoryType);
    List<Coupon> findByCompanyAndPriceLessThanEqual(Company company, double price);


    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from projectPhase3.customers_coupons where projectPhase3.customers_coupons.coupons_id = :couponId")
    void deletePurcheseById(@Param("couponId") long couponId);


}

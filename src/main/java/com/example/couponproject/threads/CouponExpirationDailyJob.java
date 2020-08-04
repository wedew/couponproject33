package com.example.couponproject.threads;

import com.example.couponproject.beans.Coupon;
import com.example.couponproject.db.couponRepository;
import org.springframework.stereotype.Component;

import java.util.Calendar;

@Component
public class CouponExpirationDailyJob implements Runnable {
    private boolean quit = false;

    private couponRepository couponRepo;

    public CouponExpirationDailyJob(couponRepository couponRepo) {
        this.couponRepo = couponRepo;
    }

    public void stopAll() {
        quit = !(quit);
    }

    @Override
    public void run() {
        while(!quit) {
            synchronized (couponRepo.findAll()){
            Calendar cal = Calendar.getInstance();
                for (Coupon coupons : couponRepo.findAll()) {
                    if (cal.getTime().after(coupons.getEndDate())) {
                        couponRepo.deletePurcheseById(coupons.getId());
                        couponRepo.deleteById(coupons.getId());
                    }
                }
            }
            try {
                Thread.sleep(1000 * 60 * 60 * 24);
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}

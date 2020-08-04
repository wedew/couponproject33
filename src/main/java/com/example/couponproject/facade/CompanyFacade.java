package com.example.couponproject.facade;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.db.companyRepository;
import com.example.couponproject.db.couponRepository;
import com.example.couponproject.db.customerRepository;
import com.example.couponproject.exceptions.CannotAddCouponInSameTitleException;
import com.example.couponproject.exceptions.CannotChangeCompanyIdOrAnCouponId;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
public class CompanyFacade extends ClientFacade {


    private long companyId;

    public CompanyFacade(companyRepository compDB, couponRepository coupDB, customerRepository custDB) {
        super(compDB, coupDB, custDB);
    }


    public long getCompanyId() {
        return companyId;
    }



    @Override
    public boolean login(String email, String password) {
        Object obj =  compDB.findByEmailAndPassword(email, password);
        if(obj instanceof Company){
            companyId = ((Company) obj).getId();
            return true;
        }else{
            return false;
        }

    }

    public void addCoupon(Coupon coupon) throws CannotAddCouponInSameTitleException {
        Object obj = coupDB.findByTitleAndCompany(coupon.getTitle(), coupon.getCompany());
        if(obj instanceof Coupon){
            throw new CannotAddCouponInSameTitleException();
        }else{
            coupDB.save(coupon);
        }
    }

    public void updateCoupon(Coupon coupon) throws CannotChangeCompanyIdOrAnCouponId {
        Object obj = coupDB.findByCompanyAndId(coupon.getCompany(), coupon.getId());
        if(obj instanceof Coupon){
            coupDB.save(coupon);
        }else{
            throw new CannotChangeCompanyIdOrAnCouponId();
        }

    }

    public void deleteCoupon(long couponId){
        coupDB.deletePurcheseById(couponId);
        coupDB.deleteById(couponId);
    }

    public List<Coupon> getAllCoupons() {
        Company company = compDB.findById(getCompanyId()).orElse(null);
        return coupDB.findByCompany(company);

    }

    public List<Coupon> getAllCoupons(CategoryType categoryType)  {
        Company company = compDB.findById(getCompanyId()).orElse(null);
        return coupDB.findByCompanyAndCategory(company, categoryType);

    }


    public List<Coupon> getAllCoupons(double maxPrice)  {
        Company company = compDB.findById(getCompanyId()).orElse(null);
        return coupDB.findByCompanyAndPriceLessThanEqual(company, maxPrice);
    }

    public Company getCompanyDetails() {
        return compDB.findById(getCompanyId()).orElse(null);

    }


}

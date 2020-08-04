package com.example.couponproject.db;

import com.example.couponproject.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepository extends JpaRepository<Customer,Long> {

    Customer findByEmailAndPassword(String email,String password);


}

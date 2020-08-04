package com.example.couponproject.controller;

import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Customer;
import com.example.couponproject.exceptions.*;
import com.example.couponproject.facade.AdminFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private Map<String, OurSession> clientSessions;

    public AdminController(Map<String, OurSession> clientSessions) {
        this.clientSessions = clientSessions;
    }

    @PostMapping("addCompany/{token}")
    public ResponseEntity<?> addCompany(@PathVariable String token, @RequestBody Company company){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).addCompany(company);
                return ResponseEntity.ok(company);
            } catch (CompanyAlreadyExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

    @PostMapping("updateCompany/{token}")
    public ResponseEntity<?> updateCompany(@PathVariable String token,@RequestBody Company company){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).updateCompany(company);
                return ResponseEntity.ok(company);
            } catch (CompanyDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
                }


    @GetMapping("{token}")
    public ResponseEntity<?> getAllCompanies(@PathVariable String token){
        OurSession session = clientSessions.get(token);
        if(session.getFacade() instanceof AdminFacade)
            return ResponseEntity.ok(((AdminFacade)session.getFacade()).getAllCompanies());
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
    }

    @DeleteMapping("deleteCompany/{token}/{companyId}")
    public ResponseEntity<String> deleteCompany(@PathVariable String token, @PathVariable long companyId){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).deleteCompany(companyId);
                return ResponseEntity.ok("company id: " + companyId + " deleted!");
            } catch (CompanyDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        }

    @GetMapping("oneCompany/{token}/{companyId}")
    public ResponseEntity<?> getOneCompany(@PathVariable String token, @PathVariable long companyId){
        OurSession session = clientSessions.get(token);
            try {
                return ResponseEntity.ok(((AdminFacade)session.getFacade()).getOneCompany(companyId));
            } catch (CompanyDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        }

    @PostMapping("addCustomer/{token}")
    public ResponseEntity<?> addCustomer(@PathVariable String token, @RequestBody Customer customer){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).addCustomer(customer);
                return ResponseEntity.ok(customer);
            } catch (CustomerAlreadyExistsException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

    @PostMapping("updateCustomer/{token}")
    public ResponseEntity<?> updateCustomer(@PathVariable String token, @RequestBody Customer customer){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).updateCustomer(customer);
                return ResponseEntity.ok(customer);
            } catch (CannotChangeIdOfCustomerException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

    @DeleteMapping("deleteCustomer/{token}/{customerId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String token, @PathVariable long customerId){
        OurSession session = clientSessions.get(token);
            try {
                ((AdminFacade)session.getFacade()).deleteCustomer(customerId);
                return ResponseEntity.ok("customer id: " + customerId + " deleted!");
            } catch (CustomerDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        }

    @GetMapping("customers/{token}")
    public ResponseEntity<?> getAllCustomers(@PathVariable String token){
        OurSession session = clientSessions.get(token);
        if(session.getFacade() instanceof AdminFacade)
            return ResponseEntity.ok(((AdminFacade)session.getFacade()).getAllCustomers());
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED login");
    }

    @GetMapping("oneCustomer/{token}/{customerId}")
    public ResponseEntity<?> getOneCustomer(@PathVariable String token, @PathVariable long customerId){
        OurSession session = clientSessions.get(token);
            try {
                return ResponseEntity.ok(((AdminFacade)session.getFacade()).getOneCustomer(customerId));
            } catch (CustomerDoesNotExistsException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        }

}

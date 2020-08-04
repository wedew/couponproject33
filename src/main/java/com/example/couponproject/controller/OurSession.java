package com.example.couponproject.controller;

import com.example.couponproject.facade.ClientFacade;

public class OurSession {

    private ClientFacade facade;
    private long lastAccessed;

    public OurSession(ClientFacade facade, long lastAccessed) {
        this.facade = facade;
        this.lastAccessed = lastAccessed;
    }

    public ClientFacade getFacade() {
        return facade;
    }

    public long getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(long lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

}

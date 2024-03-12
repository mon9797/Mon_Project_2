package com.bitc.fs501.final_team2.service;

public interface EmailService {
    void sendEmail(String userLevel, String subject, String body) throws Exception;
}
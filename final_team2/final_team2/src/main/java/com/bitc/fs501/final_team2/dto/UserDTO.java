package com.bitc.fs501.final_team2.dto;

import lombok.Data;

@Data
public class UserDTO {
    public int userIdx;
    public String userId;
    public String userPassword;
    public String userName;
    public String userEmail;
    public String userCall;
    public String preferredWine1;
    public String preferredWine2;
    public String preferredWine3;
    public String userLevel;
    public String userAddress;
    public String userSubdate;
    public String userDeletedYn;
    private String subject;
    private String body;

}
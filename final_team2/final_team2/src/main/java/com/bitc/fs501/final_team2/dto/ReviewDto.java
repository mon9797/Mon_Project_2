package com.bitc.fs501.final_team2.dto;


import lombok.Data;

@Data
public class ReviewDto {
    private int revIdx;
    private int id;
    private int userIdx;
    private String revTitle;
    private String revContent;
    private int revCnt;
    private int revRating;
    private String sFile;
    private UserDTO userDto;
}

package com.bitc.fs501.final_team2.dto;

import lombok.Data;

@Data
public class QnaDTO {
    private int inqIdx;
    private String userId;
    private String inqTitle;
    private String inqContent;
    private String inqComments;
    private String inqCreateDate;
    private String sFile;
}

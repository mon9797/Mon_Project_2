package com.bitc.fs501.final_team2.dto;


import lombok.Data;

@Data
public class OrderHistoryDto {
    private int hisIdx;
    private int userIdx;
    private int id;
    private int hisQuantity;
    private int totalPrice;
    private WineInfoDto wineInfo;
}
package com.bitc.fs501.final_team2.dto;


import lombok.Data;

@Data
public class CartItemDTO {
    private int cartIdx;
    private int userIdx;
    private int id;
    private int cartQuantity;
    private WineInfoDto wineInfo;
}
package com.bitc.fs501.final_team2.dto;

import lombok.Data;

@Data
public class WineInfoDto {
    private int id;
    private String name;
    private String producer;
    private String nation;
    private String local1;
    private String local2;
    private String varieties1;
    private String varieties2;
    private String varieties3;
    private String wineType;
    private String wineUse;
    private String abv;
    private String degree;
    private String sweet;
    private String acidity;
    private String body;
    private String tannin;
    private int price;
    private int year;
    private int ml;
    private String img;
    private int salesRate;
    private int hisQuantity;
}
package com.bitc.fs501.final_team2.dto;

import lombok.Data;

@Data
public class WishlistItemDTO {
    private int favIdx;
    private int userIdx;
    private int id;


    private WineInfoDto wineInfo;

    // Other methods...

    public void setWineInfo(WineInfoDto wineInfo) {
        this.wineInfo = wineInfo;
    }

    public int getFavIdx() {
        return favIdx;
    }

    public void setFavIdx(int favIdx) {
        this.favIdx = favIdx;
    }

    public int getUserIdx() {
        return userIdx;
    }

    public void setUserIdx(int userIdx) {
        this.userIdx = userIdx;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Other getter and setter methods...
}
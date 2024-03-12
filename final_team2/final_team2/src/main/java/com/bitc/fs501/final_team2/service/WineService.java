package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.WineInfoDto;

import java.util.List;
import java.util.Map;

public interface WineService {
    List<WineInfoDto> selectWineList() throws Exception;

    List<WineInfoDto> typeWineList(String wineType) throws Exception;

    WineInfoDto getWineDetail(int id) throws Exception;

    List<WineInfoDto> searchList(String searchStr) throws Exception;

    void wineInsert(WineInfoDto wine)  throws Exception;

    void salesRate(WineInfoDto wine) throws Exception;

    void increaseSalesRate(WineInfoDto wineInfoDto) throws Exception;
}

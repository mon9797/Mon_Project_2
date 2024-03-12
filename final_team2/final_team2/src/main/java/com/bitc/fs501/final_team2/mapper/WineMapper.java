package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WineMapper {
    //게시물 목록 조회
    List<WineInfoDto> selectWineList() throws Exception;

    List<WineInfoDto> typeWineList(String wineType) throws Exception;

    WineInfoDto getWineDetail(int id) throws Exception;

    List<WineInfoDto> searchList(String searchStr) throws Exception;

    //와인 등록
    void wineInsert(WineInfoDto wine) throws Exception;

    //판매량 등록
    void salesRate(WineInfoDto wine) throws Exception;

    void increaseSalesRate(WineInfoDto wineInfoDto) throws Exception;
}

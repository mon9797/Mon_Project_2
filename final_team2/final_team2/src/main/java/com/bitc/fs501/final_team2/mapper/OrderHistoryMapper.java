package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.OrderHistoryDto;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderHistoryMapper {
    List<OrderHistoryDto> getHistoryItemsByUserIdx(int userIdx) throws Exception;

    WineInfoDto getWineInfoById(int id) throws Exception;

    void insertOrderHistory(OrderHistoryDto orderHistoryDto);
}

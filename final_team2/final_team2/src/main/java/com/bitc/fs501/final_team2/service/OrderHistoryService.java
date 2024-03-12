package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.OrderHistoryDto;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderHistoryService {
    List<OrderHistoryDto> getHistoryItemsByUserIdx(int userIdx) throws Exception;

    WineInfoDto getWineInfoById(@Param("id") int id) throws Exception;

    void OrderHistory(OrderHistoryDto orderHistoryDto) throws Exception;
}

package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.OrderHistoryDto;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.mapper.OrderHistoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderHistoryServiceImpl implements OrderHistoryService {

    private final OrderHistoryMapper orderHistoryMapper;

    @Override
    public List<OrderHistoryDto> getHistoryItemsByUserIdx(int userIdx) throws Exception {
        return orderHistoryMapper.getHistoryItemsByUserIdx(userIdx);
    }

    @Override
    public WineInfoDto getWineInfoById(int id) throws Exception {
        return orderHistoryMapper.getWineInfoById(id);
    }


    @Override
    public void OrderHistory(OrderHistoryDto orderHistoryDto) {
        orderHistoryMapper.insertOrderHistory(orderHistoryDto);
    }
}

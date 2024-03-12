package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.CartItemDTO;
import com.bitc.fs501.final_team2.dto.OrderHistoryDto;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.service.OrderHistoryService;
import com.bitc.fs501.final_team2.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

//    구매내역 출력(마이페이지 안에서 확인)
    @GetMapping("/orderHistory/{userIdx}")
    private List<OrderHistoryDto> getHistoryItems(@PathVariable int userIdx) throws Exception {
        List<OrderHistoryDto> historyItems = orderHistoryService.getHistoryItemsByUserIdx(userIdx);
        for (OrderHistoryDto historyItem : historyItems) {
            int itemId = historyItem.getId();
            WineInfoDto wineInfo = orderHistoryService.getWineInfoById(itemId);
            historyItem.setWineInfo(wineInfo);
        }
        return historyItems;
    }

    
}

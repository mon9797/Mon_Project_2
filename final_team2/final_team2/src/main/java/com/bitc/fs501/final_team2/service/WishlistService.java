package com.bitc.fs501.final_team2.service;


import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;

import java.util.List;

public interface WishlistService {
    // 사용자 ID에 해당하는 위시리스트 아이템들을 가져오는 메서드

    // 위시리스트에서 특정 아이템을 삭제하는 메서드
    void deleteWishlistItem(int userIdx, int wineId);

    // 사용자의 위시리스트에 있는 모든 아이템을 삭제하는 메서드
    void deleteAllWishlistItems(int userIdx);

    // 와인 ID에 해당하는 와인 정보를 가져오는 메서드
    WineInfoDto getWineInfoById(int wineId)throws Exception;

    void addWishlistItem(int userIdx, int wineId) throws Exception;

    List<WishlistItemDTO> getWishlistItemsByUserIdx(int userIdx)throws Exception;

    void deleteSelectedWishlistItems(int userIdx, List<Integer> selectedWineIds);
}
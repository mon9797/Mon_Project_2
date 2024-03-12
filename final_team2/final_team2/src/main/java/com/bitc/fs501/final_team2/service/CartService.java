package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.CartItemDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CartService {
    // 사용자 ID에 해당하는 장바구니 아이템 목록 조회
    List<CartItemDTO> getCartItemsByUserIdx(int userIdx);

    // 특정 와인 ID에 해당하는 와인 정보 조회
    WineInfoDto getWineInfoById(@Param("id") int id);


    // 장바구니에서 모든 아이템 삭제
    void deleteAllCartItems(int userIdx);

    // 장바구니 아이템 수량 업데이트
    void updateCartItemQuantity(int userIdx, int wineId, int newQuantity);

    void addCartItem(int userIdx, int wineId, int quantity);

    // 선택삭제
    void deleteSelectedCartItems(int userIdx, List<Integer> wineIds);

    void deleteCartItem(int userIdx, int wineId);
}
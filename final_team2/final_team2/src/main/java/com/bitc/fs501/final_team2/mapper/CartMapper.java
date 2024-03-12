package com.bitc.fs501.final_team2.mapper;


import com.bitc.fs501.final_team2.dto.CartItemDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CartMapper {

    // 특정 사용자의 장바구니에 있는 상품 목록을 가져오는 쿼리
    List<CartItemDTO> getCartItemsByUserIdx(int userIdx);

    // 특정 상품의 정보를 가져오는 쿼리
    WineInfoDto getWineInfoById(@Param("id") int id);

    // 특정 상품의 장바구니에서의 수량을 업데이트하는 쿼리
    void updateCartItemQuantity(@Param("userIdx") int userIdx, @Param("wineId") int wineId, @Param("newQuantity") int newQuantity);

    // 사용자의 전체 장바구니를 비우는 쿼리
    void deleteAllCartItems(@Param("userIdx") int userIdx);

    int isCartItemExists(int userIdx, int wineId);

    void insertCartItem(int userIdx, int wineId, int quantity);

    void deleteCartItem(Map<String, Object> params);

    void deleteCartItem(@Param("userIdx") int userIdx, @Param("wineId") int wineId);
}
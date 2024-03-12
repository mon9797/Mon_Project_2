package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.CartItemDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {

    private final CartMapper cartMapper;

    @Autowired
    public CartServiceImpl(CartMapper cartMapper) {
        this.cartMapper = cartMapper;
    }

    // 사용자 ID에 해당하는 장바구니 아이템 목록 조회
    @Override
    public List<CartItemDTO> getCartItemsByUserIdx(int userIdx) {
        return cartMapper.getCartItemsByUserIdx(userIdx);
    }

    // 특정 와인 ID에 해당하는 와인 정보 조회
    @Override
    public WineInfoDto getWineInfoById(int id) {
        return cartMapper.getWineInfoById(id);
    }

    // 장바구니에서 모든 아이템 삭제
    @Override
    public void deleteAllCartItems(int userIdx) {
        cartMapper.deleteAllCartItems(userIdx);
    }

    // 장바구니 아이템 수량 업데이트
    @Override
    public void updateCartItemQuantity(int userIdx, int wineId, int newQuantity) {
        cartMapper.updateCartItemQuantity(userIdx, wineId, newQuantity);
    }

    @Override
    public void addCartItem(int userIdx, int wineId,int quantity) {
        // Check if the item is already in the cart
        if (cartMapper.isCartItemExists(userIdx, wineId) == 0) {
            // If the item is not in the cart, insert a new cart item
            cartMapper.insertCartItem(userIdx, wineId,quantity);
        } else {
            // If the item is already in the cart, you can handle it as needed
            // For example, you can update the quantity or ignore the request
            // In this example, I'm printing a message to the console
            System.out.println("Item is already in the cart.");
        }
    }

    @Override
    public void deleteSelectedCartItems(int userIdx, List<Integer> wineIds) {
        for (Integer wineId : wineIds) {
            Map<String, Object> params = new HashMap<>();
            params.put("userIdx", userIdx);
            params.put("wineId", wineId);
            cartMapper.deleteCartItem(params);
        }
    }

    @Override
    public void deleteCartItem(int userIdx, int wineId) {
        cartMapper.deleteCartItem(userIdx, wineId);
    }


}

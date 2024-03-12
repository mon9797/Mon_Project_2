package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.CartItemDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;
import com.bitc.fs501.final_team2.service.CartService;
import com.bitc.fs501.final_team2.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//  장바구니
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService, WishlistService wishlistService) {
        this.cartService = cartService;
    }

    // 장바구니 페이지로 이동
    @GetMapping("/view")
    @ResponseBody
    public Map<String, Object> viewCart(@RequestParam("userIdx") int userIdx) {
        Map<String, Object> response = new HashMap<>();
        // 최신 장바구니 아이템으로 모델 업데이트
        List<CartItemDTO> cartItems = getUpdatedCartItems(userIdx);
        response.put("cartItems", cartItems);
        return response;
    }

    // 추가 - 장바구니 아이템
    @PostMapping("/add")
    public Map<String, Object> addCartItem(@RequestBody Map<String, Integer> payload) {
        int userIdx = payload.get("userIdx");
        int id = payload.get("wineId");
        int quantity = payload.get("quantity");

        // 응답을 담을 맵 객체 생성
        Map<String, Object> response = new HashMap<>();

        // 서비스 메서드 호출: 장바구니에 지정된 항목 추가
        cartService.addCartItem(userIdx, id,quantity);

        // 추가 후 업데이트된 장바구니 아이템 가져오기
        List<CartItemDTO> updatedCartItems = getUpdatedCartItems(userIdx);

        // 응답 맵에 업데이트된 장바구니 아이템 추가
        response.put("cartItems", updatedCartItems);

        // 컨트롤러 메서드의 응답으로 맵 반환
        return response;
    }

    @DeleteMapping("/delete")
    public Map<String, Object> deleteItems(
            @RequestParam("userIdx") int userIdx,
            @RequestParam(value = "wineId", required = false) Integer wineId,
            @RequestBody(required = false) List<Integer> wineIds,
            @RequestParam(value = "deleteAll", required = false, defaultValue = "false") boolean deleteAll) {

        // 응답을 담을 맵 객체 생성
        Map<String, Object> response = new HashMap<>();

        if (wineId != null) {
            // 특정 아이템 삭제
            cartService.deleteCartItem(userIdx, wineId);
        } else if (wineIds != null && !wineIds.isEmpty()) {
            // 선택된 아이템 삭제
            cartService.deleteSelectedCartItems(userIdx, wineIds);
        } else if (deleteAll) {
            // 모든 아이템 삭제
            cartService.deleteAllCartItems(userIdx);
        } else {
            // 유효하지 않거나 누락된 매개변수 처리
            response.put("error", "Invalid request parameters");
            return response;
        }

        // 삭제 후 업데이트된 장바구니 아이템 가져오기
        List<CartItemDTO> updatedCartItems = getUpdatedCartItems(userIdx);

        // 응답 맵에 업데이트된 장바구니 아이템 추가
        response.put("cartItems", updatedCartItems);

        // 컨트롤러 메서드의 응답으로 맵 반환
        return response;
    }

    // 헬퍼 메서드: 업데이트된 장바구니 아이템 정보를 가져오기
    private List<CartItemDTO> getUpdatedCartItems(int userIdx) {
        List<CartItemDTO> cartItems = cartService.getCartItemsByUserIdx(userIdx);
        for (CartItemDTO cartItem : cartItems) {
            int itemId = cartItem.getId();
            WineInfoDto wineInfo = cartService.getWineInfoById(itemId);
            cartItem.setWineInfo(wineInfo);
        }
        return cartItems;
    }

    // 장바구니 아이템 수량 업데이트 처리
    @PutMapping("/updateQuantity")
    public Map<String, Object> updateCartItemQuantity(@RequestBody Map<String, Integer> payload) {
        // 응답을 담을 맵 객체 생성
        Map<String, Object> response = new HashMap<>();

        int userIdx = payload.get("userIdx");
        int wineId = payload.get("wineId");
        int newQuantity = payload.get("newQuantity");

        // 서비스 메서드 호출: 장바구니에서 지정된 항목의 수량 업데이트
        cartService.updateCartItemQuantity(userIdx, wineId, newQuantity);

        // 업데이트 후 장바구니 아이템 가져오기
        List<CartItemDTO> updatedCartItems = getUpdatedCartItems(userIdx);

        // 응답 맵에 업데이트된 장바구니 아이템 추가
        response.put("cartItems", updatedCartItems);

        // 컨트롤러 메서드의 응답으로 맵 반환
        return response;
    }
}
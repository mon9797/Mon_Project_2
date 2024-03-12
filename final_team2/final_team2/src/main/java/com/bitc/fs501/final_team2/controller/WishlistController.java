package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;
import com.bitc.fs501.final_team2.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    // 위시리스트 조회 요청 처리 메서드
    @GetMapping("/view")
    @ResponseBody
    public Map<String, Object> viewWishlist(@RequestParam("userIdx") int userIdx) {
        Map<String, Object> response = new HashMap<>();

        try {
            // 사용자의 위시리스트 아이템을 가져와 응답에 추가
            List<WishlistItemDTO> wishlistItems = getUpdatedWishlistItems(userIdx);
            response.put("wishlistItems", wishlistItems);
        } catch (Exception e) {
            // 예외가 발생하면 로그를 출력하고 에러 메시지를 응답에 추가
            e.printStackTrace();
            response.put("error", "위시리스트 아이템을 가져오는 중 에러가 발생했습니다. 나중에 다시 시도해주세요.");
        }

        return response;
    }

    // 위시리스트 아이템 추가 요청 처리 메서드
    @PostMapping("/add")
    public Map<String, Object> addWishlistItem(@RequestBody Map<String, Integer> payload) {
        int userIdx = payload.get("userIdx");
        int wineId = payload.get("wineId");
        Map<String, Object> response = new HashMap<>();

        try {
            // 위시리스트에 새로운 아이템 추가하고 업데이트된 위시리스트를 응답에 추가
            wishlistService.addWishlistItem(userIdx, wineId);
            List<WishlistItemDTO> updatedWishlistItems = getUpdatedWishlistItems(userIdx);
            response.put("wishlistItems", updatedWishlistItems);
        } catch (Exception e) {
            // 예외가 발생하면 로그를 출력하고 에러 메시지를 응답에 추가
            e.printStackTrace();
            response.put("error", "위시리스트 아이템 추가 중 에러가 발생했습니다. 나중에 다시 시도해주세요.");
        }

        return response;
    }

    @DeleteMapping("/delete")
    public Map<String, Object> deleteWishlistItems(@RequestParam("userIdx") int userIdx,
                                                   @RequestParam(value = "wineId", required = false) Integer wineId,
                                                   @RequestBody(required = false) List<Integer> selectedWineIds) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (wineId != null) {
                // 단일 위시리스트 아이템 삭제
                wishlistService.deleteWishlistItem(userIdx, wineId);
            } else if (selectedWineIds != null && !selectedWineIds.isEmpty()) {
                // 선택한 위시리스트 아이템 삭제
                wishlistService.deleteSelectedWishlistItems(userIdx, selectedWineIds);
            } else {
                // 모든 위시리스트 아이템 삭제
                wishlistService.deleteAllWishlistItems(userIdx);
            }

            // 업데이트된 위시리스트 아이템을 가져와 응답에 추가
            List<WishlistItemDTO> updatedWishlistItems = getUpdatedWishlistItems(userIdx);
            response.put("wishlistItems", updatedWishlistItems);
        } catch (Exception e) {
            // 예외 처리 및 에러 메시지를 응답에 추가
            e.printStackTrace();
            response.put("error", "위시리스트 아이템 삭제 중 에러가 발생했습니다. 나중에 다시 시도해주세요.");
        }

        return response;
    }

    private List<WishlistItemDTO> getUpdatedWishlistItems(int userIdx)throws Exception {
        // 사용자의 위시리스트 아이템을 가져옴
        List<WishlistItemDTO> wishlistItems = wishlistService.getWishlistItemsByUserIdx(userIdx);

        // 위시리스트가 비어있으면 빈 리스트를 생성
        if (wishlistItems.isEmpty()) {
            wishlistItems = new ArrayList<>();
        } else {
            // 위시리스트 아이템에 대한 와인 정보를 가져와 설정
            for (WishlistItemDTO wishlistItem : wishlistItems) {
                int itemId = wishlistItem.getId();
                WineInfoDto wineInfo = wishlistService.getWineInfoById(itemId);

                // Check for nullability of wineInfo
                if (wineInfo != null) {
                    // wishlistItem의 와인 정보를 업데이트
                    wishlistItem.setWineInfo(wineInfo);
                }
            }
        }

        return wishlistItems;
    }

}
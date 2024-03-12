package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;
import com.bitc.fs501.final_team2.mapper.CartMapper;
import com.bitc.fs501.final_team2.mapper.WishlistMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistMapper wishlistMapper;
    //    private final CartMapper cartMapper;
    @Autowired
    public WishlistServiceImpl(WishlistMapper wishlistMapper, CartMapper cartMapper) {
        this.wishlistMapper = wishlistMapper;
//        this.cartMapper = cartMapper;
    }

    // 위시리스트에서 특정 아이템을 삭제하는 메서드
    @Override
    public void deleteWishlistItem(int userIdx, int wineId) {
        wishlistMapper.removeFromFavorites(userIdx, wineId);
    }

    // 사용자의 위시리스트에 있는 모든 아이템을 삭제하는 메서드
    @Override
    public void deleteAllWishlistItems(int userIdx) {
        wishlistMapper.deleteAllByUserIdx(userIdx);
    }

    // 와인 ID에 해당하는 와인 정보를 가져오는 메서드
    @Override
    public WineInfoDto getWineInfoById(int wineId)throws Exception {
        return wishlistMapper.getWineById(wineId);
    }

    @Override
    public void addWishlistItem(int userIdx, int wineId) throws Exception {
        // 위시리스트에 항목이 이미 있는지 확인
        WishlistItemDTO existingItem = wishlistMapper.getWishlistItemByUserAndWine(userIdx, wineId);

        if (existingItem == null) {
            // 위시리스트에 항목이 없으면 추가
            WishlistItemDTO newItem = new WishlistItemDTO();
            newItem.setUserIdx(userIdx);
            newItem.setId(wineId);

            wishlistMapper.addToFavorites(newItem);
        }
        // 이미 위시리스트에 항목이 있는 경우, 필요에 따라 처리할 수 있습니다 (예: 업데이트 또는 무시)
    }

    @Override
    public List<WishlistItemDTO> getWishlistItemsByUserIdx(int userIdx) throws Exception{
        List<WishlistItemDTO> wishlistItems = wishlistMapper.getWishlistItemsByUserIdx(userIdx);

        // Additional processing or validation if needed

        return wishlistItems;
    }

    @Override
    public void deleteSelectedWishlistItems(int userIdx, List<Integer> selectedWineIds) {
        try {
            // 선택된 위시리스트 아이템들을 반복하면서 삭제
            for (Integer wineId : selectedWineIds) {
                wishlistMapper.removeFromFavorites(userIdx, wineId);
            }
        } catch (Exception e) {
            // 예외 처리 - 필요에 따라 로깅 또는 다른 예외 처리 로직 추가 가능
            e.printStackTrace();
            throw new RuntimeException("선택한 위시리스트 아이템 삭제 중 에러 발생");
        }
    }


}
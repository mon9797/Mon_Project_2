package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;
import java.util.Map;

@Mapper
public interface WishlistMapper {
    // 모든 와인 정보 조회
//    List<WineInfoDTO> getAllWines();

    // 특정 와인 ID로 와인 정보 조회
    WineInfoDto getWineById(@Param("wineId") int wineId);

    // 사용자의 찜목록에 있는 모든 와인 정보 조회

    // 사용자의 찜목록에서 와인 삭제
    void removeFromFavorites(@Param("userIdx") int userIdx, @Param("wineId") int wineId);

    void removeFromFavorites(int userIdx, Integer wineId);

    // 사용자의 찜목록에서 모든 와인 삭제
    void deleteAllByUserIdx(@Param("userIdx")int userIdx);

    WishlistItemDTO getWishlistItemByUserAndWine(@Param("userIdx") int userIdx, @Param("wineId") int wineId)throws Exception;


    void addToFavorites(WishlistItemDTO newItem);

    List<WishlistItemDTO> getWishlistItemsByUserIdx(int userIdx);


}

package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.dto.WishlistItemDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;

@Mapper
public interface WinelistMapper {
    // 모든 와인 정보 조회
    List<WineInfoDto> getAllWines();

    // 특정 와인 ID로 와인 정보 조회
    WineInfoDto getWineById(@Param("wineId") int wineId);

    // 사용자의 찜목록에 있는 모든 와인 정보 조회
    List<WishlistItemDTO> getFavoritesByUserIdx(@Param("userIdx") int userIdx);
    // 사용자의 찜목록에 와인 추가
    void addToFavorites(@Param("userIdx") int userIdx, @Param("wineId") int wineId);

    // 사용자의 찜목록에서 와인 삭제
    void removeFromFavorites(@Param("userIdx") int userIdx, @Param("wineId") int wineId);
}

package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDto> getAllReviews();
    List<ReviewDto> getReviewsByWineId(@Param("wineId") int wineId, @Param("start") int start, @Param("pageSize") int pageSize);

    ReviewDto getReviewById(int revIdx);
    void addReview(ReviewDto rev);
    void updateReview(ReviewDto review);
    void deleteReview(int revIdx);

    int getTotalReviewsByWineId(int id);

    Integer getFileInfo(int revIdx);

    List<ReviewDto> myReviews(int userIdx);

    void increaseReviewCount(int revIdx) throws Exception;

//    List<ReviewDto> getReviewsByUserIdx(@Param("userIdx") int userIdx, @Param("start") int start, @Param("pageSize") int pageSize);
//    int getTotalReviewsByUserIdx(int userIdx);
}